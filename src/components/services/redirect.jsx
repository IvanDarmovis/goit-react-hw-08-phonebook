import { Navigate, Outlet } from 'react-router-dom';

function PrivatePath({ isLoggedIn, redirectPath }) {
  if (!isLoggedIn) return <Navigate to={redirectPath} replace />;
  return <Outlet />;
}

function OnlyPublicPath({ isLoggedIn, redirectPath }) {
  if (isLoggedIn) return <Navigate to={redirectPath} replace />;
  return <Outlet />;
}

export { PrivatePath, OnlyPublicPath };
