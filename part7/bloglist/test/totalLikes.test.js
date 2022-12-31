const totalLikes = require("../utils/list_helper").totalLikes;

describe("total likes", () => {
    const listWithOneBlog = [
        {
            _id: "1",
            title: "test",
            author: "test",
            url: "test.com",
            likes: 5,
            __v: 1,
        },
    ];

    const listWithMultipleBlogs = [
        {
            _id: "1",
            title: "test",
            author: "test",
            url: "test.com",
            likes: 5,
            __v: 1
        },
        {
            _id: "2",
            title: "test2",
            author: "test2",
            url: "test2.com",
            likes: 10,
            __v: 2
        }
    ];

    test("totalLikes test with no objects", () => {
        expect(totalLikes([])).toBe(0);
    });

    test("totalLikes test with one object", () => {
        expect(totalLikes(listWithOneBlog)).toBe(5);
    });

    test("totalLikes test with multiple objects", () => {
        expect(totalLikes(listWithMultipleBlogs)).toBe(15);
    });

});
