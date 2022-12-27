
const BlogForm = ({createBlog, newTitle, setNewTitle, newAuthor,setNewAuthor ,newUrl, setNewUrl }) => {
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createBlog}>
                <div>title: <input value={newTitle} onChange={({ target }) => setNewTitle(target.value)} /></div>
                <div>author:<input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} /></div>
                <div>url:<input value={newUrl} onChange={({ target }) => setNewUrl(target.value)} /></div>
                <div><button type="submit">create</button></div>
            </form>
        </>

    );
};

export default BlogForm;
