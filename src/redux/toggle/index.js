import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSettingOpen: false
};

export const toggleSlice = createSlice({
    name: "toggle",
    initialState,
    reducers: {
        toggleSetting: (state) => {
            state.isSettingOpen = !state.isSettingOpen
        }
    },
});

export const { toggleSetting } = toggleSlice.actions;

export default toggleSlice.reducer;
