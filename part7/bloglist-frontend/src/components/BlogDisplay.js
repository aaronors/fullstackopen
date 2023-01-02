import { useRef } from "react";

import Notification from "./Notification";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blog from "./Blog";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/userReducer";

const BlogDisplay = () => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const blogFormRef = useRef();
    const dispatch = useDispatch();

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <p>
                {user.name} logged in{" "}
                <button type="submit" onClick={() => {dispatch(logout())}}>
                    logout
                </button>
            </p>

            <Togglable showLabel="new blog" hideLabel="cancel" ref={blogFormRef}>
                <BlogForm blogFormRef={blogFormRef}/>
            </Togglable>
            <ul>
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </ul>
        </div>
    );
};

export default BlogDisplay;
