import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};
// Load user data from localStorage if available
const storedUser = { isAuthenticated: true, user: JSON.parse(localStorage.getItem("user")) };

const userSlice = createSlice({
  name: "user",
  initialState: storedUser.user ? storedUser : initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
