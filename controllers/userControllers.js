const userModel = require("../model/userModel");
const bcrypt = require('bcrypt');

// Register user
const registerUser = async(req,res) => {
    try {
        const {username,email,password} = req.body;

        // Field validation
        if(!username || !email || !password){
            return res.status(400).send({
                success:false,
                message: "Please fill all the fields"
            })
        }

        // Validate existing user
        const existingUser = await userModel.findOne({email:email});
        if(existingUser){
            return res.status(401).send({
                success:false,
                message:"User is already exist"
            })
        }

        // create new user
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new userModel({username,email,password:hashedPassword});
        await newUser.save();
        return res.status(201).send({
            success:true,
            message:"User created successfully",
            newUser
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Not able to create user",
            error
        })
    }
}

// login as user
const loginUser = async(req,res) => {
    try {
        if(!req.body.email || !req.body.password){
            return res.status(401).send({
                success:false,
                message : "Please provide credentials"
            })
        }

        const user = await userModel.findOne({email:req.body.email});
        if(!user){
            return res.status(200).send({
                success:false,
                message:"Email is not registered"
            })
        }

        const isMatched = await bcrypt.compare(req.body.password,user.password);
        if(!isMatched){
            return res.status(401).send({
                success:false,
                message:"Invalid password!"
            })
        }
        const {password,...info} = user._doc;
        return res.status(200).send({
            success: true,
            message: "login successfully",
            info,
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error In Login Callcback",
            error,
          });
        
    }
}

// GET all users
const getAllUsers = async(req,res) => {
    try {
        const users = await userModel.find();
        return res.status(200).send({
            userCount:users.length,
            success:true,
            message: "Fetched all users",
            data:users
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Unable to get users",
            error,
          });
    }
}

module.exports = {getAllUsers,registerUser,loginUser}