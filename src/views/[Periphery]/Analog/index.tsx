import { Route, Routes } from 'react-router-dom';

import Adc from './Adc';
import Dac from './Dac';
import Temp from './Temp';

const Analog = () => (
  <Routes>
    <Route path="adc" element={<Adc />} />
    <Route path="dac" element={<Dac />} />
    <Route path="temp" element={<Temp />} />
  </Routes>
);

export default Analog;
