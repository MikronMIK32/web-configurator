import { combineReducers } from '@reduxjs/toolkit';

import { i2cSlice } from './i2c';
import { spiSlice } from './spi';
import { usartSlice } from './usart';

const interfaceReducer = combineReducers({
  spi: spiSlice.reducer,
  i2c: i2cSlice.reducer,
  usart: usartSlice.reducer,
});

export default interfaceReducer;
