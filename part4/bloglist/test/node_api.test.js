const supertest = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");
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

test("test to verify if blog likes can be updated", async () => {
    const insertedBlogs = await helper.blogsInDb();
    const blogToUpdate = insertedBlogs[0];

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: 100 })
        .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd[0].likes).toBe(100);
});

// --

describe("when there is initially one user in db", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash("sekret", 10);
        const user = new User({ username: "root", passwordHash });

        await user.save();
    });

    test("creation succeeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "mluukkai",
            name: "Matti Luukkainen",
            password: "salainen",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map((u) => u.username);
        expect(usernames).toContain(newUser.username);
    });

    //check if error is thrown when invalid username
    test("test to verify user with invalid username is not inserted", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "ml",
            name: "Matti Luukkainen",
            password: "salainen",
        };

        await api.post("/api/users").send(newUser).expect(400);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });    

    //check if error is thrown when invalid password
    test("test to verify user with invalid password is not inserted", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "mluukkai",
            name: "Matti Luukkainen",
            password: "sa",
        };

        await api.post("/api/users").send(newUser).expect(400);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });    
});

describe("test functionality when a user is logged in", () => {
    let token;

    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash("sekret", 10);
        const user = new User({ username: "root", passwordHash });

        const savedUser = await user.save();

        const userForToken = {
            username: savedUser.username,
            id: savedUser._id,
        };
    
        token = jwt.sign(userForToken, process.env.SECRET);
    });

    test("a valid blog can be added", async () => {
        const newBlog = {
            title: "newly inserted blog",
            author: "test",
            url: "test.com",
            likes: 5,
        };
    
        await api
            .post("/api/blogs")
            .set('Authorization', `Bearer ${token}`)
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
            url: "test.com",
        };
    
        await api
            .post("/api/blogs")
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);
    
        const insertedBlogs = await helper.blogsInDb();
        expect(insertedBlogs).toHaveLength(helper.initialBlogs.length + 1);
    
        const contents = insertedBlogs.map((b) => b.likes);
        expect(contents).toContain(0);
    });

    test("throw error if title is missing on post", async () => {
        const newBlog = {
            author: "test",
            url: "test.com",
        };
    
        await api
            .post("/api/blogs")
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400);
    
        const insertedBlogs = await helper.blogsInDb();
    
        expect(insertedBlogs).toHaveLength(helper.initialBlogs.length);
    });    

    test("throw error if url is missing on post", async () => {
        const newBlog = {
            title: "newly inserted blog",
            author: "test",
        };
    
        await api
            .post("/api/blogs")
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400);
    
        const insertedBlogs = await helper.blogsInDb();
    
        expect(insertedBlogs).toHaveLength(helper.initialBlogs.length);
    });

    test("test blog delete success", async () => {

        const newBlog = {
            title: "newly inserted blog",
            author: "test",
            url: "uniqueurl.com",
            likes: 5,
        };
    
        const savedBlog = await api.post("/api/blogs")
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog);

        await api
            .delete(`/api/blogs/${savedBlog.body.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204);
    
        const blogsAtEnd = await helper.blogsInDb();
    
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    
        const urls = blogsAtEnd.map((r) => r.url);
    
        expect(urls).not.toContain(savedBlog.body.url);
    });
    
});

test("unauthorized access returns 401", async () => {
    const newBlog = {
        title: "newly inserted blog",
        author: "test",
        url: "test.com",
        likes: 5,
    };

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/);
});

afterAll(() => {
    mongoose.connection.close();
});
