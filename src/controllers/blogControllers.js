const { copyFileSync } = require('fs');
const fs = require('fs/promises');
const path = require('path');


const checkBlogBodyMiddleware = async (req, res, next) => {
    const { title, content, category, author, tags } = req.body;

    if (!title || !content || !category || !author || !tags) {
        return res.status(400).json({
            status: 'fail',
            message: 'All fields are required'
        });
    }

    next();
}

const getBlogs = async (path) => {
    try {
        const blogs = await fs.readFile(path, 'utf-8');
        if (!blogs) {
            throw new Error('No blogs found');
        }

        return JSON.parse(blogs);
    } catch (error) {
        console.log(error);
    }
}



const saveBlog = async (blog) => {
    try {
        const pathFile = path.join(__dirname, '../data/blogs.json');

        if (!Array.isArray(blog)) {
            const blogs = await getBlogs(pathFile);


            if (!blogs) {
                throw new Error('No blogs found');
            }

            blogs.push(blog);

            await fs.writeFile(pathFile, JSON.stringify(blogs));
        } else {
            await fs.writeFile(pathFile, JSON.stringify(blog));
        }
        return true;
    } catch (error) {
        console.log(error);
    }
}

const createBlog = async (req, res) => {
    try {
        const pathName = path.join(__dirname, '../data/blogs.json');

        const { title, content, category, author, tags } = req.body;
        const blogs = await getBlogs(pathName);

        const blog = {
            title,
            content,
            category,
            author,
            tags,
            createdAt: new Date(),
            updateAt: new Date()
        };
        const newBlog = Object.assign({ id: blogs[blogs.length - 1].id + 1 }, blog);

        const state = await saveBlog(newBlog);


        if (!state) {
            throw new Error('Blog not created');
        }

        res.status(201).json({
            status: 'sucess',
            data: {
                blog
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}


const getAllBlogs = async (req, res) => {
    try {

        const { term } = req.query;

        const pathName = path.join(__dirname, '../data/blogs.json');
        const posts = await getBlogs(pathName);
        let filteredPosts = posts;

        if (!posts) {
            return res.status(404).json({
                status: 'fail',
                message: 'No posts found'
            });
        }

        if (term) {
            const searchTerm = term.toLowerCase();

            console.log(searchTerm);
            console.log(posts);

            filteredPosts = posts.filter(post =>
                post.title.toLowerCase().includes(searchTerm) ||
                post.content.toLowerCase().includes(searchTerm) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        res.status(200).json({
            status: 'sucess',
            data: {
                filteredPosts
            },
            results: filteredPosts.length
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'error',
            message: error.message
        })
    }
}

const checkIdMiddleware = async (req, res, next, val) => {
    try {
        const id = Number(val);
        const pathName = path.join(__dirname, '../data/blogs.json');
        const posts = await getBlogs(pathName);
        const post = posts.find(el => el.id == id);
        const postIndex = posts.findIndex(el => el.id == id);

        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }

        req.post = post;
        req.postIndex = postIndex;



        next();
    } catch (error) {

    }
}

const getPostById = async (req, res) => {
    try {
        const post = req.post;
        res.status(200).json({
            status: 'sucess',
            data: {
                post
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

const deletePost = async (req, res) => {
    try {
        const index = req.postIndex;
        const pathName = path.join(__dirname, '../data/blogs.json');
        const posts = await getBlogs(pathName);

        posts.splice(index, 1);
        console.log(posts);

        await saveBlog(posts);

        res.status(304).send();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const pathName = path.join(__dirname, '../data/blogs.json');
        const { author, title, content, category, tags } = req.body;

        const post = {
            id: req.post.id,
            author,
            title,
            content,
            category,
            tags,
            createdAt: req.post.createdAt,
            updateAt: new Date()
        }

        console.log(post);


        // Carregando os posts
        const posts = await getBlogs(pathName);
        posts[req.postIndex] = post;

        if (!await saveBlog(posts)) throw new Error('Something went wrong saving the post :(');

        res.status(200).json({
            status: 'sucess',
            data: {
                post
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

module.exports = {
    createBlog,
    checkBlogBodyMiddleware,
    getAllBlogs,
    checkIdMiddleware,
    getPostById,
    deletePost,
    updatePost
}