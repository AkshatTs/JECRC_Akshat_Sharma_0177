import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { restoreSession } from './redux/slices/authSlice';
import { setTheme } from './redux/slices/uiSlice';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const theme = useSelector(state => state.ui.theme);

  // Restore session and theme from localStorage on app mount
  useEffect(() => {
    const savedSession = localStorage.getItem('authSession');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        dispatch(restoreSession(session));
      } catch (error) {
        console.error('Error restoring session:', error);
      }
    }

    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  return (
    <div className={`app ${theme}`}>
      {isLoggedIn ? <Dashboard /> : <Login />}
    </div>
  );
}

export default App;
