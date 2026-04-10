import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  isLoading: false,
  notification: null,
  sidebarOpen: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Toggle Theme
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },

    // Set Theme
    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    // Set Loading State
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Show Notification
    showNotification: (state, action) => {
      state.notification = action.payload;
    },

    // Clear Notification
    clearNotification: (state) => {
      state.notification = null;
    },

    // Toggle Sidebar
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    // Set Sidebar State
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  setIsLoading,
  showNotification,
  clearNotification,
  toggleSidebar,
  setSidebarOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
