const jwt = require('jsonwebtoken');
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const userExtractor = require("../utils/middleware").userExtractor;

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

    response.json(blogs);
});

blogsRouter.post("/",userExtractor ,async (request, response) => {
    const user = request.user;

    const blog = new Blog(request.body);

    if (!blog.title || !blog.url) {
        return response.status(400).json({
            error: "body or url is missing",
        });
    }

    blog.user = user._id;

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id",userExtractor ,async (request, response) => {
    const user = request.user;

    const blog = await Blog.findById(request.params.id);

    if(user.id.toString() !== blog.user.toString()){
        return response.status(401).json({ error: 'user unauthorized to delete this blog' })
    }

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
    const body = request.body;

    const blog = {
        likes: body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    }).populate('user', { username: 1, name: 1 });
    response.json(updatedBlog).end();
});

module.exports = blogsRouter;
