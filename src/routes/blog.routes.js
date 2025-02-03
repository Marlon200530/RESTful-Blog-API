const express = require('express');
const { createBlog, checkBlogBodyMiddleware, getAllBlogs, checkIdMiddleware, getPostById, deletePost, updatePost } = require('../controllers/blogControllers');

const router = express.Router();

router.param('id', checkIdMiddleware);

router.route('/')
    .get(getAllBlogs)
    .post(checkBlogBodyMiddleware, createBlog)

router.route('/:id')
    .get(getPostById)
    .delete(deletePost)
    .put(updatePost);

module.exports = router;