import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login Action
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },

    // Logout Action
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },

    // Set Auth Error
    setAuthError: (state, action) => {
      state.error = action.payload;
    },

    // Clear Error
    clearAuthError: (state) => {
      state.error = null;
    },

    // Restore Session (for persistence)
    restoreSession: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
  },
});

export const {
  login,
  logout,
  setAuthError,
  clearAuthError,
  restoreSession,
} = authSlice.actions;

export default authSlice.reducer;
