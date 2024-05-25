import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allMessage: [],
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        sendingMessage: (state, action) => {
            state.allMessage.push({
                isSender: true,
                msg: action.payload.msg,
                user: action.payload.user
            })
        },
        receivedMessage: (state, action) => {
            state.allMessage.push({
                isSender: false,
                msg: action.payload.msg,
            })
        }
    },
});

export const { sendingMessage, receivedMessage } = chatSlice.actions;

export default chatSlice.reducer;
