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

test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("the id property on a blog must be set", async () => {
    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r._id);
    expect(contents).toBeDefined();
});

test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r.title);

    expect(contents).toContain("test2");
});

test("a valid blog can be added", async () => {
    const newBlog = {
        title: "newly inserted blog",
        author: "test",
        url: "test.com",
        likes: 5
    };

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const insertedBlogs = await helper.blogsInDb();
    expect(insertedBlogs).toHaveLength(helper.initialBlogs.length + 1);

    const contents = insertedBlogs.map((b) => b.title);
    expect(contents).toContain("newly inserted blog");
});

test("a blog can be added with no likes", async () => {
    const newBlog = {
        title: "newly inserted blog",
        author: "test",
        url: "test.com"
    };

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const insertedBlogs = await helper.blogsInDb();
    expect(insertedBlogs).toHaveLength(helper.initialBlogs.length + 1);

    const contents = insertedBlogs.map((b) => b.likes);
    expect(contents).toContain(0);
});

afterAll(() => {
    mongoose.connection.close();
});
