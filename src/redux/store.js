import { configureStore } from '@reduxjs/toolkit';
import { contactsApi, userApi } from './api';
import { filterReducer, userReducer } from './reducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'contacts',
  storage,
};

const persistUserConfig = {
  key: 'user',
  storage,
};

const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: persistReducer(
      persistConfig,
      contactsApi.reducer
    ),
    user: persistReducer(persistUserConfig, userReducer),
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware => {
    return [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      contactsApi.middleware,
      userApi.middleware,
    ];
  },
});

const persistor = persistStore(store);

export { store, persistor };
