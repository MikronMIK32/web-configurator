import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import analogReducer from './analog';
import apiStorage from './apiStorage';
import cryptoReducer from './crypto';
import interfaceReducer from './interface';
import systemReducer from './system';
import timersReducer from './timers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const internalSlice = createSlice({
  name: '__internal',
  initialState: {
    isLoaded: false,
  },
  reducers: {
    setLoaded: (old, action: PayloadAction<boolean>) => ({ ...old, isLoaded: action.payload }),
  },
});

const projectReducer = combineReducers({
  timers: timersReducer,
  analog: analogReducer,
  crypto: cryptoReducer,
  interface: interfaceReducer,
  system: systemReducer,

  __internal: internalSlice.reducer,
});

export type ProjectState = ReturnType<typeof projectReducer>;

const isLocalStorage = process.env.USE_LOCAL_STORAGE === 'true';

export const persistedProjectReducer = persistReducer<ProjectState>(
  {
    key: 'root',
    throttle: 200,
    storage: apiStorage,
    ...(isLocalStorage && {
      storage,
    }),
    stateReconciler: autoMergeLevel2,
  },
  projectReducer
);
