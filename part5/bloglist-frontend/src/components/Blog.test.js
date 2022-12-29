import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("<Blog/> renders content", () => {
    const blog = {
        _id: "1",
        title: "title",
        author: "author",
        url: "test.com",
        likes: 5,
        user: {
            username: "username",
            name: "name"
        },
        __v: 1
    };

    const container = render(<Blog key={blog.id} blog={blog} updateBlogLikes={jest.fn()} deleteBlog={jest.fn()}/>).container;

    const div = container.querySelector(".blogHeader");
    expect(div).toHaveTextContent("title author")

    expect(div).not.toHaveTextContent(blog.url);
    expect(div).not.toHaveTextContent(blog.likes);

});
