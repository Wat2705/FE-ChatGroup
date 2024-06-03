import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogIn: false,
    user: null,
    id: ''
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isLogIn = true;
            state.user = action.payload.user;
            state.id = action.payload.id
            localStorage.setItem('token', action.payload.token);
        },
    },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;