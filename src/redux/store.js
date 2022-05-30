import { configureStore } from '@reduxjs/toolkit';
import * as reducer from './reducer';

const store = configureStore({ reducer: reducer });

export default store;
