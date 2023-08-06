import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  totalUsers: 0,
  
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload.users;
      state.totalUsers = action.payload.users.length;
    },
    addProduct(state, action) {
      state.products.push(action.payload);
      state.totalProducts++;
    },
    deleteProduct(state, action) {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product._id !== productId
      );
      state.totalProducts--;
    },
  },
});

export const { setUsers, addProduct, deleteProduct } = userSlice.actions;
export default userSlice.reducer;
