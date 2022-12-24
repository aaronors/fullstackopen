const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
    {
        title: "test",
        author: "test",
        url: "test.com",
        likes: 5,
    },
    {
        title: "test2",
        author: "test2",
        url: "test2.com",
        likes: 10,
    },
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map((u) => u.toJSON());
};

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb,
};
