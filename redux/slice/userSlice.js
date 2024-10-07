import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

const userSlice = createSlice({
    name: 'chat',
    initialState: {
      User: {
        id: '1234',
        name: 'Mainak Mitra',
        email: 'mainak.mitra@gmail.com',
        userName:"mainak4ever",
        avatar:"https://images.unsplash.com/photo-1630026317249-c1c83b21ea07?q=80&w=2785&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      status: 'idle',
      error: null,
      isLoggedIn: true
    },
    reducers: {
      setUser(state, action) {
        state.User.push(action.payload);
      },
      clearUser(state) {
        state.User = {};
        state. isLoggedIn = false
        state.status = 'idle';
        state.error = null;
      },
    },
    extraReducers: (builder) => {},
  });
  
  export const { setUser, clearUser} = userSlice.actions;
  
  export default userSlice.reducer;