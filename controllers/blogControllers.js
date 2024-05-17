const blogModel = require("../model/blogModel");
const userModel = require("../model/userModel");

// get all blogs
const getAllBlogs = async(req,res) => {
    try {
        const blogs = await blogModel.find().sort({createdAt:-1});
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:"No blogs found"
            })
        }
        return res.status(200).send({
            success:true,
            message:"Fetched all blogs",
            blogCount:blogs.length,
            blogs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error while getting blogs",
            error
        })
    }
}

// get blog by id
const getBlogById = async(req,res) => {
    try {
        const {id} = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
              success: false,
              message: "blog not found with this id",
            });
          }
          return res.status(200).send({
            success: true,
            message: "fetch single blog",
            blog,
          });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error while getting one blog",
            error
        })
    }
}

// create new blog
const createBlog = async(req,res) => {
    try {
        const {title,description,image,userId} = req.body;
        if(!title || !description || !image){
            return res.status(400).send({
                success:false,
                message:"Please fill the details"
            })
        }

        const existingUser = await userModel.findById(userId);
        if(!existingUser){
            return res.status(404).send({
                success:false,
                message:"Unable to find user"
            })
        }
        
        const newBlog = new blogModel({title,description,image,user:userId});
        await newBlog.save();
        existingUser.blogs.push(newBlog);
        await existingUser.save();
        
        return res.status(201).send({
            success:true,
            message:"Blog created successfully",
            newBlog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error while creating blogs",
            error
        })
    }
}

// update blog
const updateBlog = async(req,res) => {
    try {
        const blogId = req.params.id;
        const {title,description,image} = req.body;
        const blog = await blogModel.findByIdAndUpdate(blogId,{...req.body},{new:true});
        return res.status(200).send({
            success:true,
            message:"Blog updated",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error while updating blogs",
            error
        })
    }
}

// delete blog
const deleteBlog = async(req,res) => {
    try {
        const {id} = req.params;
        const blog = await blogModel.findByIdAndDelete(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success:true,
            message:"Blog deleted"
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error while deleting blogs",
            error
        })
    }
}

//GET USER BLOG
const userBlogById= async (req, res) => {
    try {
      const userBlog = await userModel.findById(req.params.id).populate("blogs");
  
      if (!userBlog) {
        return res.status(404).send({
          success: false,
          message: "blogs not found with this id",
        });
      }
      return res.status(200).send({
        success: true,
        message: "user blogs",
        userBlog,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "error in user blog",
        error,
      });
    }
  };

module.exports = {getAllBlogs,getBlogById,createBlog,updateBlog,deleteBlog,userBlogById}

