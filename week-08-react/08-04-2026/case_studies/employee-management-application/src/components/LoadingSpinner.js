import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '../redux/slices/uiSlice';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  const isLoading = useSelector(state => state.ui.isLoading);

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner">
        <div className="spinner-inner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
