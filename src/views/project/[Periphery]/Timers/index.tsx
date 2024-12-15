import { Route, Routes } from 'react-router-dom';

import Rtc from './Rtc';
import TIMER16_0 from './TIMER16_0';
import TIMER16_1 from './TIMER16_1';
import TIMER16_2 from './TIMER16_2';

const Timers = () => (
  <Routes>
    <Route path="timer16_0" element={<TIMER16_0 />} />
    <Route path="timer16_1" element={<TIMER16_1 />} />
    <Route path="timer16_2" element={<TIMER16_2 />} />
    <Route path="rtc" element={<Rtc />} />
  </Routes>
);

export default Timers;
