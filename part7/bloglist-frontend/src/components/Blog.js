import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
    const [showDetails, setShowDetails] = useState(false);
    const dispatch = useDispatch();

    const hideWhenVisible = { display: showDetails ? "none" : "" };
    const showWhenVisible = { display: showDetails ? "" : "none" };    

    const toggleShowDetails = () => {
        setShowDetails(!showDetails);
    };

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    return (
        <li>
            <div className="blogHeader" style={{...hideWhenVisible, ...blogStyle}}>
                {blog.title} {blog.author}&emsp; 
                <button onClick={toggleShowDetails}>show</button>
            </div>
            <div className="blogBody" style={{...showWhenVisible, ...blogStyle}}>
                <div>
                    {blog.title} {blog.author} &emsp; 
                    <button onClick={toggleShowDetails}>hide</button>
                </div>
                <div>{blog.url}</div>
                <div>{blog.likes} <button onClick={() => {dispatch(updateBlog(blog))}}>like</button></div>
                <div>{blog.user.name}</div>
                <button onClick={() => {dispatch(removeBlog(blog))}}>remove</button>
            </div>
        </li>
    );
};

export default Blog;
