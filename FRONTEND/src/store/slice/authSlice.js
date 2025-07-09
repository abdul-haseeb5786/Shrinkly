import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  showAuthModal: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.showAuthModal = false;
    },
    logout: (state) => {
        state.user = null;
      state.isAuthenticated = false;
    },
     setShowAuthModal: (state, action) => {
      state.showAuthModal = action.payload;
    },
  },
});

export const { login, logout, setShowAuthModal } = authSlice.actions;
export default authSlice.reducer;
