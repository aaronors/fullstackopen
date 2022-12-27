import { useState } from "react";

import BlogForm from "./BlogForm";

const Blog = ({ blog }) => {
    const [showDetails, setShowDetails] = useState(false);

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
        <div>
            <div style={{...hideWhenVisible, ...blogStyle}}>
                {blog.title} {blog.author}&emsp; 
                <button onClick={toggleShowDetails}>show</button>
            </div>
            <div style={{...showWhenVisible, ...blogStyle}}>
                <div>
                    {blog.title} {blog.author} &emsp; 
                    <button onClick={toggleShowDetails}>hide</button>
                </div>
                <div>{blog.url}</div>
                <div>{blog.likes} 0 <button>like</button></div>
                <div>{blog.user.name}</div>
            </div>
        </div>
    );
};

export default Blog;
