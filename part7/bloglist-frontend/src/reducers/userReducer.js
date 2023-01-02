import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
        removeUser(state, action) {
            return null;
        }
    },
});

export const { setUser, removeUser } = userSlice.actions;

export const login = (username, password) => {
    return async (dispatch) => {
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
            dispatch(setUser(user));
        } catch (exception) {
            dispatch(setNotification("Wrong credentials", "error"))
        }
    };
};  

export const logout = () => {
    return async (dispatch) => {
        window.localStorage.removeItem("loggedBlogAppUser");
        dispatch(removeUser());
    };
};  

export default userSlice.reducer;

