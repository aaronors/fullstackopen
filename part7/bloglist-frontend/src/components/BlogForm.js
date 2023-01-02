
import { useDispatch } from "react-redux";
import { createNewBlog } from '../reducers/blogReducer'

const BlogForm = ({blogFormRef}) => {
    const dispatch = useDispatch();

    const addBlog = (event) => {
        event.preventDefault();
        dispatch(createNewBlog({
            title: event.target.titleInput.value,
            author: event.target.authorInput.value,
            url: event.target.urlInput.value
        }));
        blogFormRef.current.toggleVisibility();
        event.target.reset();
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>title: <input id="titleInput" name="titleInput" /></div>
                <div>author:<input id="authorInput" name="authorInput" /></div>
                <div>url:<input id="urlInput" name="urlInput" /></div>
                <div><button id="createBlog" type="submit">create</button></div>
            </form>
        </>

    );
};

export default BlogForm;
