import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
  key: 'root',
  storage,
};

const combined = combineReducers({
  contacts: contactsReducer,
  user: userReducer,
  filter: filterReducer,
});

const store = configureStore({
  reducer: {
    root: persistReducer(persistConfig, combined),
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
