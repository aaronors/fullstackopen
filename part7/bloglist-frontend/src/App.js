import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { setUser, logout } from "./reducers/userReducer";

import { initializeBlogs, createNewBlog, updateBlog, removeBlog } from './reducers/blogReducer'

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

    const createBlog = (blogObject) => {
        try {
            dispatch(createNewBlog(blogObject));

            dispatch(setNotification(
                `A new blog ${blogObject.title} by ${blogObject.author} added`, 
                "success"
            ))

            blogFormRef.current.toggleVisibility();
        } catch (exception) {
            console.log(exception);
            dispatch(setNotification(exception.response.data.error, "error"))
        }
    }

    const updateBlogLikes = (blogObject) => {
        try {
            dispatch(updateBlog(blogObject));
            dispatch(setNotification(
                `A like has been added to ${blogObject.title}`, 
                "success"
            ))

        } catch (exception) {
            console.log(exception);
            dispatch(setNotification(exception.response.data.error, "error"))
        }
    }

    const deleteBlog = (blogObject) => {
        if(!window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) return;

        try {
            dispatch(removeBlog(blogObject));
            dispatch(setNotification(
                `${blogObject.title} has been deleted`, 
                "success"
            ))

        } catch (exception) {
            console.log(exception);
            dispatch(setNotification(exception.response.data.error, "error"))
        }
    }

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
                <BlogForm createBlog={createBlog}/>
            </Togglable>
            <ul>
                {blogs.map((blog) => (
                    <Blog 
                        key={blog.id} 
                        blog={blog} 
                        updateBlogLikes={() => updateBlogLikes(blog)}
                        deleteBlog={() => deleteBlog(blog)}
                    />
                ))}
            </ul>
        </div>
    );

    return <div>{user === null ? loginDisplay() : blogDisplay()}</div>;
};

export default App;
