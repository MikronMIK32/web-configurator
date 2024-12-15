import { combineReducers } from '@reduxjs/toolkit';

import { busWdtSlice } from './bus-wdt';
import { gpioSlice } from './gpio';
import { otpSlice } from './otp';
import { pccSlice } from './pcc';
import { pdpSlice } from './pdp';
import { vccMonitorSlice } from './vcc-monitor';
import { wdtSlice } from './wdt';
import { eepromSlice } from './eeprom';

const systemReducer = combineReducers({
  pcc: pccSlice.reducer,
  otp: otpSlice.reducer,
  busWdt: busWdtSlice.reducer,
  gpio: gpioSlice.reducer,
  wdt: wdtSlice.reducer,
  pdp: pdpSlice.reducer,
  vccMonitor: vccMonitorSlice.reducer,
  eeprom: eepromSlice.reducer,
});

export default systemReducer;
