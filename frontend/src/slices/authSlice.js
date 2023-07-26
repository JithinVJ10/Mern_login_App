import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null,
    adminInfo: localStorage.getItem('adminInfo')
    ? JSON.parse(localStorage.getItem('adminInfo'))
    : null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers :{
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        setAdminCredentials: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
        logoutAdmin: (state) => {
            state.adminInfo = null;
            localStorage.removeItem('adminInfo');
        },
    }

})

export const { setCredentials, setAdminCredentials, logout,logoutAdmin  } = authSlice.actions;

export default authSlice.reducer;
