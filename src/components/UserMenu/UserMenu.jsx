import { Link, Outlet } from 'react-router-dom';

export default function UserMenu() {
  return (
    <div>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/contacts">Contacts</Link>
      </div>
      <div>
        <p></p>
        <button type="button">Log Out</button>
      </div>
      <Outlet />
    </div>
  );
}
