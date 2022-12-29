import { useState } from "react";

const Blog = ({ blog, updateBlogLikes, deleteBlog }) => {
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
                <div>{blog.likes} <button onClick={updateBlogLikes}>like</button></div>
                <div>{blog.user.name}</div>
                <button onClick={deleteBlog}>remove</button>
            </div>
        </div>
    );
};

export default Blog;
