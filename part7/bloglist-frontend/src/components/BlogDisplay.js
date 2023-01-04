import { useRef } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blog from "./Blog";

import { useSelector } from "react-redux";

const BlogDisplay = () => {
    const blogs = useSelector(state => state.blogs)
    const blogFormRef = useRef();

    const blogStyle = {
        listStyle: "none",
        margin: "0px 0px",
        padding: "0px 0px 0px 0px"
    };

    return (
        <div>
            <h2>blogs</h2>

            <Togglable showLabel="new blog" hideLabel="cancel" ref={blogFormRef}>
                <BlogForm blogFormRef={blogFormRef}/>
            </Togglable>
            <ul style={blogStyle}>
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </ul>
        </div>
    );
};

export default BlogDisplay;
