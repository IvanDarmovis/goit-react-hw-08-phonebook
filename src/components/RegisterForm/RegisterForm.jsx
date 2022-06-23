import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../redux/api';

import s from './RegisterForm.module.css';

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
    <form onSubmit={onFormSubmit}>
      <label>
        Name
        <input
          className={s.labelInput}
          onChange={onInputChange}
          value={name}
          type="text"
          name="name"
          placeholder="Enter your name"
          required
        />
      </label>
      <label>
        Email
        <input
          className={s.labelInput}
          onChange={onInputChange}
          value={email}
          type="text"
          name="email"
          placeholder="Enter Email"
          required
        />
      </label>
      <label className={s.label}>
        Password
        <input
          className={s.labelInput}
          onChange={onInputChange}
          value={password}
          type="password"
          name="password"
          placeholder="Enter Password"
          required
        />
      </label>
      <button type="submit">Regiset</button>
    </form>
  );
}
