import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.userName = action.payload;

        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            // state.isLoggedIn = false;
        },
        setuser: (state, action) => {
            state.userData = action.payload;
        }
    }
})

export const { login, logout, setuser } = authSlice.actions;

export default authSlice.reducer;