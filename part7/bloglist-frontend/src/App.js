import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "./reducers/userReducer";

import { initializeBlogs } from './reducers/blogReducer'

import "./App.css";

const App = (props) => {

    const blogFormRef = useRef();
    const dispatch = useDispatch();

    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
            blogService.setToken(user.token);
        }
    }, [dispatch]);

    const handleLogout = () => { dispatch(logout()); };

    const loginDisplay = () => (
        <div>
            <h2>Log in to application</h2>
            <Notification />
            <LoginForm />
        </div>
    );

    const blogDisplay = () => (
        <div>
            <h2>blogs</h2>
            <Notification />
            <p>
                {user.name} logged in{" "}
                <button type="submit" onClick={handleLogout}>
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

    return <div>{user === null ? loginDisplay() : blogDisplay()}</div>;
};

export default App;
