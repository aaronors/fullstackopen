import { createSlice } from "@reduxjs/toolkit";

const initialState = "default notification";

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        updateNotification(state, action) {
            return state;
        },
    },
});

export const { updateNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
