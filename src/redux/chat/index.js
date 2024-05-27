import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allMessage: [],
    userList: []
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        sendingMessage: (state, action) => {
            state.allMessage.push({
                isSender: true,
                msg: action.payload.msg,
                user: action.payload.user,
                time: action.payload.time
            })
        },
        receivedMessage: (state, action) => {
            state.allMessage.push({
                isSender: false,
                msg: action.payload.msg,
                user: action.payload.user.name,
                time: action.payload.time,
            })
        },
        getUserList: (state, action) => {
            state.userList = action.payload
        }
    },
});

export const { sendingMessage, receivedMessage, getUserList } = chatSlice.actions;

export default chatSlice.reducer;
