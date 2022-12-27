import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

import "./App.css";
import Togglable from "./components/Togglable";

const App = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);
    const [notificationType, setNotificationType] = useState(null);

    const blogFormRef = useRef();

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

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

    const clearBlogForm = () => {
        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
    }

    const displayNotification = (msg, type) => {
        setNotification(msg);
        setNotificationType(type);
        setTimeout(() => {setNotification(null)}, 5000);
    }

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
            displayNotification("Wrong credentials", "error");
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
            <Notification message={notification} notificationType={notificationType}/>
            <LoginForm
                    handleLogin = {handleLogin}
                    username = {username}
                    password = {password}
                    setUsername = {setUsername}
                    setPassword = {setPassword}
            />
        </div>
    );

    const createBlog = async (event) => {
        event.preventDefault();
        try {
            const returnedBlog = await blogService.create({
                title: newTitle,
                author: newAuthor,
                url: newUrl
            });
            setBlogs(blogs.concat(returnedBlog));
            clearBlogForm();
            displayNotification(
                `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 
                "success"
            );
            blogFormRef.current.toggleVisibility();
        } catch (exception) {
            displayNotification(exception.response.data.error, "error");
        }
    }

    const blogDisplay = () => (
        <div>
            <h2>blogs</h2>
            <Notification message={notification} notificationType={notificationType}/>
            <p>
                {user.name} logged-in{" "}
                <button type="submit" onClick={handleLogout}>
                    logout
                </button>
            </p>

            <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm
                    createBlog = {createBlog}
                    newTitle = {newTitle}
                    setNewTitle = {setNewTitle}
                    newAuthor = {newAuthor}
                    setNewAuthor = {setNewAuthor}
                    newUrl = {newUrl}
                    setNewUrl = {setNewUrl}
                />
            </Togglable>

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );

    return <div>{user === null ? loginDisplay() : blogDisplay()}</div>;
};

export default App;
