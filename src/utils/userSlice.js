import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload; // this will set my state to the provided value
        },
        removeUser: (state, action) => {
            return null;
        }
    }
})

export const {addUser, removeUser} = userSlice.actions;

export default userSlice.reducer;