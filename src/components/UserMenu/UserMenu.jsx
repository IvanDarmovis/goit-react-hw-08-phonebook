import { Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import { logoutUser } from 'redux/api';

export default function UserMenu() {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.root.user.user.name);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            '& *': {
              color: 'inherit',
              mr: '50px',
              p: '10px',
              textDecoration: 'none',
            },
          }}
        >
          <Link to="login">Login</Link>
          <Link to="signup">Sign Up</Link>
          <Link to="contacts">Contacts</Link>
        </Box>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography
            variant="h6"
            component={'span'}
            sx={{
              mr: 10,
            }}
          >
            {userName}
          </Typography>
          <Button
            onClick={() => dispatch(logoutUser())}
            sx={{
              color: 'inherit',
            }}
          >
            Log Out
          </Button>
        </Box>
      </Toolbar>
      <Outlet />
    </AppBar>
  );
}
