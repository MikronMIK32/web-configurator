import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistedProjectReducer } from './project';
import { persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';
import { authSlice } from './auth';

const reducer = combineReducers({
  project: persistedProjectReducer,
  auth: authSlice.reducer,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk as any),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
