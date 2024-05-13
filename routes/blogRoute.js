const express = require('express');
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog, userBlogById } = require('../controllers/blogControllers');
const router = express.Router();

router.get('/getAllBlogs',getAllBlogs);
router.get('/getBlogDetail/:id',getBlogById);
router.post('/create-blog',createBlog);
router.put('/update-blog/:id',updateBlog);
router.delete('/delete-blog/:id',deleteBlog);
router.get('/user-blog/:id',userBlogById);

module.exports = router;