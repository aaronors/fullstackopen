import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        createNotification(state, action) {
            return action.payload;
        },
        removeNotification(state) {
            return null;
        },
    },
});

export const { createNotification, removeNotification } = notificationSlice.actions;

let timeoutId;
export const setNotification = (text, seconds) => {
    return async (dispatch) => {
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        dispatch(createNotification(text));
        timeoutId = setTimeout(() => {dispatch(removeNotification())}, seconds * 1000);
    };
};  

export default notificationSlice.reducer;

