import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import loggerMiddleware from '../middleware/logger';

// Create Redux Store
export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
