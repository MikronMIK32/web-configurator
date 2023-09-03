import { combineReducers } from '@reduxjs/toolkit';

import { spiSlice } from './spi';
import { i2cSlice } from './i2c';

const interfaceReducer = combineReducers({
  spi: spiSlice.reducer,
  i2c: i2cSlice.reducer,
});

export default interfaceReducer;
