import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm/> sends the correct info to the event handler", async () => {
    let createBlog = jest.fn();
    const user = userEvent.setup();
    render(<BlogForm createBlog={createBlog}/>);

    const inputs = screen.getAllByRole('textbox');

    await user.type(inputs[0], "newTitle");
    await user.type(inputs[1], "newAuthor");
    await user.type(inputs[2], "newUrl");

    const createButton = screen.getByText('create');
    await user.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);

    const createdObject = createBlog.mock.calls[0][0];
    expect(createdObject.title).toBe("newTitle");
    expect(createdObject.author).toBe("newAuthor");
    expect(createdObject.url).toBe("newUrl");
});
