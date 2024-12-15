import { combineReducers } from '@reduxjs/toolkit';

import { adcSlice } from './adc';
import { dacSlice } from './dac';
import { tempSlice } from './temp';

const analogReducer = combineReducers({
  adc: adcSlice.reducer,
  dac: dacSlice.reducer,
  temp: tempSlice.reducer,
});

export default analogReducer;
