import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-box">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;