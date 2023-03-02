import { combineReducers } from '@reduxjs/toolkit';

import { crcSlice } from './crc';
import { cryptoSlice } from './crypto';

const cryptoReducer = combineReducers({
  crc: crcSlice.reducer,
  crypto: cryptoSlice.reducer,
});

export default cryptoReducer;
