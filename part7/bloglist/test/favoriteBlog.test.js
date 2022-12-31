const favoriteBlog = require("../utils/list_helper").favoriteBlog;

describe("favorite blog", () => {
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

    test("favoriteBlog test with no objects", () => {
        expect(favoriteBlog([])).toBe(null);
    });

    test("favoriteBlog test with one object", () => {
        expect(favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0]);
    });

    test("favoriteBlog test with multiple objects", () => {
        expect(favoriteBlog(listWithMultipleBlogs)).toEqual(listWithMultipleBlogs[1]);
    });

});
