import { Link, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'redux/api';

export default function UserMenu() {
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/contacts">Contacts</Link>
      </div>
      <div>
        <p></p>
        <button type="button" onClick={() => dispatch(logoutUser())}>
          Log Out
        </button>
      </div>
      <Outlet />
    </div>
  );
}
