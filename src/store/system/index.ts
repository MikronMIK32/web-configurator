import { combineReducers } from '@reduxjs/toolkit';

import { pccSlice } from './pcc';
import { otpSlice } from './otp';

const systemReducer = combineReducers({
  pcc: pccSlice.reducer,
  otp: otpSlice.reducer
});

export default systemReducer;
