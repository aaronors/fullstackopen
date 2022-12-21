const Blog = require("../models/blog");

const initialBlogs = [
    {
        title: "test",
        author: "test",
        url: "test.com",
        likes: 5
    },
    {
        title: "test2",
        author: "test2",
        url: "test2.com",
        likes: 10
    }
];


const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

module.exports = {
    initialBlogs,
    blogsInDb,
};
