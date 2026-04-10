import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
  error: null,
  loading: false,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // Add Employee
    addEmployee: (state, action) => {
      state.employees.push({
        id: Date.now(),
        ...action.payload,
      });
    },

    // Update Employee
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = { ...state.employees[index], ...action.payload };
      }
    },

    // Delete Employee
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
    },

    // Set Loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Set Error
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Load Employees (for persistence)
    loadEmployees: (state, action) => {
      state.employees = action.payload;
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setLoading,
  setError,
  loadEmployees,
} = employeeSlice.actions;

export default employeeSlice.reducer;
