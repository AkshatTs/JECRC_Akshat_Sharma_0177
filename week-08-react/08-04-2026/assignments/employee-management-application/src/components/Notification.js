import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../redux/slices/uiSlice';
import './Notification.css';

const Notification = () => {
  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <div className={`notification notification-${notification.type}`}>
      <div className="notification-content">
        <span className="notification-icon">
          {notification.type === 'success' ? '✓' : '✕'}
        </span>
        <span className="notification-message">{notification.message}</span>
      </div>
      <button
        onClick={() => dispatch(clearNotification())}
        className="notification-close"
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
