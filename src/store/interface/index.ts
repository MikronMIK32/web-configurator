import { combineReducers } from '@reduxjs/toolkit';

import { spiSlice } from './spi';

const interfaceReducer = combineReducers({
  spi: spiSlice.reducer,
});

export default interfaceReducer;
