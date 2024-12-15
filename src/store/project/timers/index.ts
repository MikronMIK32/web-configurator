import { combineReducers } from '@reduxjs/toolkit';
import { rtcSlice } from './rtc';
import { timer16Slice } from './timer16';

const timersReducer = combineReducers({
  rtc: rtcSlice.reducer,
  timer16: timer16Slice.reducer,
});

export default timersReducer;
