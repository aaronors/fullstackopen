
import { useState } from "react";

const BlogForm = ({createBlog}) => {
    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newUrl, setNewUrl] = useState("");   
    
    const addBlog = (event) => {

        event.preventDefault();
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        });

        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>title: <input id="titleInput" value={newTitle} onChange={({ target }) => setNewTitle(target.value)} /></div>
                <div>author:<input id="authorInput"value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} /></div>
                <div>url:<input id="urlInput" value={newUrl} onChange={({ target }) => setNewUrl(target.value)} /></div>
                <div><button id="createBlog" type="submit">create</button></div>
            </form>
        </>

    );
};

export default BlogForm;
