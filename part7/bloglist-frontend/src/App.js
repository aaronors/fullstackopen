import { useEffect } from "react";
import blogService from "./services/blogs";
import LoginDisplay from "./components/LoginDisplay";
import BlogDisplay from "./components/BlogDisplay";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./reducers/userReducer";

import { initializeBlogs } from './reducers/blogReducer'

import "./App.css";

const App = (props) => {
    const dispatch = useDispatch();
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

    return <div>{user === null ? <LoginDisplay/> : <BlogDisplay/>}</div>;
};

export default App;
