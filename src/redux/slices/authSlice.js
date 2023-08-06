import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLogin: false,
  token: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.isLogin = action.payload.isSuccess;
      state.token = action.payload.token;
    },
    logout(state) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = {};
      state.token = "";
      state.isLogin = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
