import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { filter, contactAdd, contactDelete } from './actions';

const items = window.localStorage.getItem('contacts')
  ? JSON.parse(window.localStorage.getItem('contacts'))
  : [];

const filterReducer = createReducer('', {
  [filter]: (state, action) => action.payload,
});

const contactListReducer = createReducer(items, {
  [contactAdd]: (state, action) => {
    const arr = [...state, action.payload];
    window.localStorage.setItem('contacts', JSON.stringify(arr));
    return arr;
  },
  [contactDelete]: (state, action) => {
    const arr = state.filter(el => el.id !== action.payload);
    window.localStorage.setItem('contacts', JSON.stringify(arr));
    return arr;
  },
});

const contactsReducer = combineReducers({
  items: contactListReducer,
  filter: filterReducer,
});

export default combineReducers({
  contacts: contactsReducer,
});
