import { createReducer, createAction, createSlice } from '@reduxjs/toolkit';
import {
  getContacts,
  addContact,
  deleteContact,
  changeContact,
  getCurrentUser,
  signupUser,
  loginUser,
  logoutUser,
} from './api';

const filter = createAction('contactList/filter');

const userInit = {
  user: {
    name: '',
    email: '',
  },
  token: '',
  isLogged: false,
  isFetching: false,
};

const contactsInit = {
  list: [],
  isFetching: true,
};

const filterReducer = createReducer('', {
  [filter]: (_, action) => action.payload,
});

const userSlice = createSlice({
  name: 'user',
  initialState: userInit,
  extraReducers: {
    [signupUser.pending]: state => {
      state.isFetching = true;
    },
    [loginUser.pending]: state => {
      state.isFetching = true;
    },
    [getCurrentUser.pending]: state => {
      state.isFetching = true;
    },
    [signupUser.fulfilled]: (state, action) => {
      if (!action.payload) return;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLogged = true;
      state.isFetching = false;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      if (!payload) return;
      state.user = payload.user;
      state.token = payload.token;
      state.isLogged = true;
      state.isFetching = false;
    },
    [getCurrentUser.fulfilled]: (state, { payload }) => {
      if (!payload) return;
      state.user = payload.user;
      state.isLogged = true;
      state.isFetching = false;
    },
    [logoutUser.fulfilled]: state => {
      state.user.name = '';
      state.user.email = '';
      state.token = '';
      state.isLogged = false;
    },
  },
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInit,
  extraReducers: {
    [getContacts.fulfilled]: (state, action) => {
      if (!action.payload) return;
      state.list = [...action.payload];
      state.isFetching = false;
    },
    [addContact.fulfilled]: state => {
      state.isFetching = true;
    },
    [changeContact.fulfilled]: state => {
      state.isFetching = true;
    },
    [deleteContact.fulfilled]: state => {
      state.isFetching = true;
    },
  },
});

const { reducer: userReducer } = userSlice;
const { reducer: contactsReducer } = contactsSlice;

export { filterReducer, filter, userReducer, contactsReducer };
