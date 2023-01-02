import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const sortBlogs = (blogList) => {
    return blogList.sort((a, b) => {return b.likes - a.likes});
}

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        updateList(state, action) {
            const updatedBlog = action.payload;

            const blogList = state.map((blog) =>
                blog.id !== updatedBlog.id ? blog : updatedBlog
            );

            return sortBlogs(blogList);
        },
        updateListRemove(state, action) {
            const removedBlog = action.payload;
            return sortBlogs(state.filter(blog => blog.id !== removedBlog.id));
        },
        appendBlog(state, action) {
            state.push(action.payload);
        },
        setBlogs(state, action) {
            return action.payload;
        }    
    },
});

export const { updateList, appendBlog, setBlogs, updateListRemove } = blogSlice.actions;

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        sortBlogs(blogs);
        dispatch(setBlogs(blogs));
    };
};

export const createNewBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog);
        dispatch(appendBlog(newBlog));
    };
};    

export const updateBlog = (blog) => {
    return async (dispatch) => {
        const returnedBlog = await blogService.updateLikes(blog);
        dispatch(updateList(returnedBlog));
    };
};    

export const removeBlog = (blog) => {
    return async (dispatch) => {
        await blogService.remove(blog);
        dispatch(updateListRemove(blog));

    };
};    

export default blogSlice.reducer;
