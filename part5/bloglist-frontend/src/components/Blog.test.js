import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

let container;
let blog;
let updatedBlogLikes = jest.fn();
let deleteBlog = jest.fn();

beforeEach(() => {
    blog = {
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
    
    container = render(<Blog key={blog.id} blog={blog} updateBlogLikes={updatedBlogLikes} deleteBlog={deleteBlog}/>).container;
});


test("<Blog/> renders content", () => {
    const div = container.querySelector(".blogHeader");
    expect(div).toHaveTextContent("title author")

    expect(div).not.toHaveTextContent(blog.url);
    expect(div).not.toHaveTextContent(blog.likes);

});

test("<Blog/> shows all info after clicking the show button", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    const div = container.querySelector(".blogBody");
    expect(div).not.toHaveStyle("display: none");

});

test("<Blog/> like button works as expected", async () => {
    const user = userEvent.setup();
    const showButton = screen.getByText("show");
    await user.click(showButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(updatedBlogLikes.mock.calls).toHaveLength(2)
});
