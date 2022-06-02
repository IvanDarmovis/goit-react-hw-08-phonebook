import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { filter, contactAdd, contactDelete } from './actions';

const filterReducer = createReducer('', {
  [filter]: (_, action) => action.payload,
});

const contactListReducer = createReducer([], {
  [contactAdd]: (state, action) => [...state, action.payload],
  [contactDelete]: (state, action) =>
    state.filter(el => el.id !== action.payload),
});

const contactsReducer = combineReducers({
  items: contactListReducer,
  filter: filterReducer,
});

export default contactsReducer;
