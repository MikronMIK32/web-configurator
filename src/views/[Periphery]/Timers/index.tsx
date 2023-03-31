import { Route, Routes } from 'react-router-dom';
import BasicTimer from './BasicTimer';
import Rtc from './Rtc';

const Timers = () => (
  <Routes>
    <Route path="timer32" element={<BasicTimer timerName="timer32" />} />
    <Route path="timer16" element={<BasicTimer timerName="timer16" />} />
    <Route path="rtc" element={<Rtc />} />
  </Routes>
);

export default Timers;
