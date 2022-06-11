import { createReducer } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    // axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const filter = createAction('contactList/filter');
const register = createAction('user/register');

const userInit = {
  user: { name: '', email: '' },
  token: '',
  isLogged: false,
};

const filterReducer = createReducer('', {
  [filter]: (_, action) => action.payload,
});

const userReducer = createReducer(userInit, {
  [register]: (state, action) => {
    token.set(action.payload.token);
    state.isLogged = true;
    return action.payload;
  },
});

export { filterReducer, userReducer, filter, register, token };
