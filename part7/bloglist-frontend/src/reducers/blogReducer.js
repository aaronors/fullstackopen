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

        },
        appendBlog(state, action) {
            state.push(action.payload);
        },
        setBlogs(state, action) {
            return action.payload;
        }    
    },
});

export const { updateList, appendBlog,setBlogs } = blogSlice.actions;

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

export default blogSlice.reducer;
