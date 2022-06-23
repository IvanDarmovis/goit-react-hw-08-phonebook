import { configureStore } from '@reduxjs/toolkit';
import { filterReducer, userReducer, contactsReducer } from './reducer';
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
    contacts: persistReducer(persistConfig, contactsReducer),
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
    ];
  },
});

const persistor = persistStore(store);

export { store, persistor };
