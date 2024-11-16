import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';

import analogReducer from './analog';
import apiStorage from './apiStorage';
import cryptoReducer from './crypto';
import interfaceReducer from './interface';
import systemReducer from './system';
import timersReducer from './timers';

const rootReducer = combineReducers({
  timers: timersReducer,
  analog: analogReducer,
  crypto: cryptoReducer,
  interface: interfaceReducer,
  system: systemReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

const isLocalStorage = process.env.USE_LOCAL_STORAGE === 'true';

const persistedReducer = persistReducer<RootReducer>(
  {
    key: 'root',
    throttle: 200,
    storage: apiStorage,
    ...(isLocalStorage && {
      storage,
    }),
    stateReconciler: autoMergeLevel2,
  },
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk as any),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
