import { combineReducers } from '@reduxjs/toolkit';

import { adcSlice } from './adc';
import { dacSlice } from './dac';

const analogReducer = combineReducers({
  adc: adcSlice.reducer,
  dac: dacSlice.reducer,
});

export default analogReducer;
