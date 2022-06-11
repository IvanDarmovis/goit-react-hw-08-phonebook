import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUserSignupMutation } from 'redux/api';
import { register } from '../../redux/reducer';

import s from './LoginForm.module.css';

export default function LoginForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [signupUser] = useUserSignupMutation();

  const onFormSubmit = async e => {
    e.preventDefault();
    const { data } = await signupUser({ name, email, password });
    dispatch(register(data));
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
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
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
          //   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          placeholder="Enter Password"
          required
        />
      </label>
      <button type="submit">Regiset</button>
    </form>
  );
}
