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
                content: action.payload.content,
                senderId: {
                    _id: action.payload.id
                },
                imageId: action.payload.imageId,
                created_at: new Date()
            })
        },
        receivedMessage: (state, action) => {
            state.allMessage.push({
                content: action.payload.content,
                senderId: {
                    _id: action.payload.id
                },
                imageId: action.payload.imageId,
                created_at: new Date()
            })
        },
        getUserList: (state, action) => {
            state.userList = action.payload
        },
        storeMessage: (state, action) => {
            state.allMessage = action.payload
        }
    },
});

export const { sendingMessage, receivedMessage, getUserList, storeMessage } = chatSlice.actions;

export default chatSlice.reducer;
