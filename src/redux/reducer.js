import { createReducer } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

export const filter = createAction('contactList/filter');

export const filterReducer = createReducer('', {
  [filter]: (_, action) => action.payload,
});
