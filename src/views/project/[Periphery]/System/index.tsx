import { Route, Routes } from 'react-router-dom';

import Pcc from './Pcc';
import Otp from './Otp';
import VccMonitor from './VccMonitor';
import PDP from './PDP';
import GPIO from './GPIO';
import WDT from './WDT';
import BusWDT from './BusWDT';
import EEPROM from './EEPROM';

const System = () => (
  <Routes>
    <Route path="pcc" element={<Pcc />} />
    <Route path="eeprom" element={<EEPROM />} />
    <Route path="otp" element={<Otp />} />
    <Route path="vcc-monitor" element={<VccMonitor />} />
    <Route path="pdp" element={<PDP />} />
    <Route path="gpio" element={<GPIO />} />
    <Route path="wdt" element={<WDT />} />
    <Route path="bus-wdt" element={<BusWDT />} />
  </Routes>
);

export default System;
