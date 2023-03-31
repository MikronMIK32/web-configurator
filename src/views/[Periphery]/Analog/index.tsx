import { Route, Routes } from 'react-router-dom';

import Adc from './Adc';
import Dac from './Dac';

const Analog = () => (
  <Routes>
    <Route path="adc" element={<Adc />} />
    <Route path="dac" element={<Dac />} />
  </Routes>
);

export default Analog;
