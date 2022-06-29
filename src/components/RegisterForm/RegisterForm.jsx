import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../redux/api';
import { TextField, Box, Button } from '@mui/material';

export default function LoginForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(signupUser({ name, email, password }));
  };

  const onInputChange = e => {
    e.preventDefault();
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        return setName(value);
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
      onSubmit={onFormSubmit}
      component={'form'}
      autocomplete="off"
      noValidate
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
        value={name}
        type="text"
        name="name"
        placeholder="Enter your name"
        required
      />
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
        variant="outlined"
        onChange={onInputChange}
        value={password}
        type="password"
        name="password"
        placeholder="Enter Password"
        required
      />
      <Button type="submit">Regiset</Button>
    </Box>
  );
}
