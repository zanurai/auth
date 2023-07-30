import { createSlice } from "@reduxjs/toolkit"
//import { useRegisterMutation } from "../slices/usersApiSlice";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;

            // const { name } = action.payload;
            // state.userInfo = { ...action.payload, name };
            // console.log('Received payload', action.payload);
            // console.log('Name:', name)
            //state.userInfo = action.payload;
            //state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload))//localstroage ma save garxa


        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo')

        },
        profile: (state, action) => {
            state.userInfo = null;
            localStorage.updateItem('userInfo')
        },
    }
});
export const { setCredentials, logout, profile } = authSlice.actions
export default authSlice.reducer;


