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
import { initializeBlogs, createNewBlog } from './reducers/blogReducer'

import "./App.css";

const App = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const blogFormRef = useRef();
    const dispatch = useDispatch();

    const blogs = useSelector(state => state.blogs)

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const clearUserCredentials = () => {
        setUsername("");
        setPassword("");
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem(
                "loggedBlogAppUser",
                JSON.stringify(user)
            );
            blogService.setToken(user.token);
            setUser(user);
            clearUserCredentials();
        } catch (exception) {
            dispatch(setNotification("Wrong credentials", "error"))
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem("loggedBlogAppUser");
        setUser(null);
        clearUserCredentials();
    };

    const loginDisplay = () => (
        <div>
            <h2>Log in to application</h2>
            <Notification />
            <LoginForm
                    handleLogin = {handleLogin}
                    username = {username}
                    password = {password}
                    setUsername = {setUsername}
                    setPassword = {setPassword}
            />
        </div>
    );

    const createBlog = async (blogObject) => {
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

    const updateBlogLikes = async (blogObject) => {
        try {
            // const returnedBlog = await blogService.updateLikes(blogObject);
            // const updatedBlogList = blogs.map((blog) => (blog.id !== returnedBlog.id ? blog : returnedBlog));

            // //setBlogs(sortBlogs(updatedBlogList));
            // dispatch(setNotification(
            //     `A like has been added to ${returnedBlog.title}`, 
            //     "success"
            // ))

        } catch (exception) {
            console.log(exception);
            dispatch(setNotification(exception.response.data.error, "error"))
        }
    }

    const deleteBlog = async (blogObject) => {
        if(!window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) return;

        try {
            // await blogService.remove(blogObject);
            // setBlogs(blogs.filter(blog => blog.id !== blogObject.id));

            // dispatch(setNotification(
            //     `${blogObject.title} has been deleted`, 
            //     "success"
            // ))

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
