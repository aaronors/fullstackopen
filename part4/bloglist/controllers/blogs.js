const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

    response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body);
    const users = await User.find({});
    const user = users[0];

    blog.user = user;

    if (!blog.title || !blog.url) {
        return response.status(400).json({
            error: "body or url is missing",
        });
    }

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
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
    });
    response.json(updatedBlog).end();
});

module.exports = blogsRouter;
