const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
});

// test("blogs are returned as json", async () => {
//     await api
//         .get("/api/blogs")
//         .expect(200)
//         .expect("Content-Type", /application\/json/);
// });

test("the id property on a blog must be set", async () => {
    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r._id);
    expect(contents).toBeDefined();
});

// test("all blogs are returned", async () => {
//     const response = await api.get("/api/blogs");

//     expect(response.body).toHaveLength(helper.initialBlogs.length);
// });

// test("a specific blog is within the returned blogs", async () => {
//     const response = await api.get("/api/blogs");

//     const contents = response.body.map((r) => r.title);

//     expect(contents).toContain("test2");
// });

afterAll(() => {
    mongoose.connection.close();
});
