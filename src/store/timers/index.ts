import { combineReducers } from '@reduxjs/toolkit';
import { rtcSlice } from './rtc';

const timersReducer = combineReducers({
  rtc: rtcSlice.reducer,
});

export default timersReducer;
