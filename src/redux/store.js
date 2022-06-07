import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './api';
import { filterReducer } from './reducer';

const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});

export { store };
