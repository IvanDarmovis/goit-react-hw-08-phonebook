import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, loginUser } from 'redux/api';
import { TextField, Box, Button } from '@mui/material';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = useSelector(state => state.root.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token !== '') dispatch(getCurrentUser());
  }, [dispatch, token]);

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const onInputChange = e => {
    e.preventDefault();
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  return (
    <Box
      component={'form'}
      autocomplete="off"
      noValidate
      onSubmit={onFormSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 400,
        alignItems: 'center',
        m: '0 auto',
        '& *': {
          mt: 1,
        },
      }}
    >
      <TextField
        variant="outlined"
        onChange={onInputChange}
        value={email}
        type="text"
        name="email"
        placeholder="Enter Email"
        required
      />
      <TextField
        onChange={onInputChange}
        value={password}
        type="password"
        name="password"
        placeholder="Enter Password"
        required
      />
      <Button type="submit">Login</Button>
    </Box>
  );
}
