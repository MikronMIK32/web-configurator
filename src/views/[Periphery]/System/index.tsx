import { Route, Routes } from 'react-router-dom';

import Pcc from './Pcc';
import Otp from './Otp';

const System = () => (
  <Routes>
    <Route path="pcc" element={<Pcc />} />
    <Route path="otp" element={<Otp />} />
    <Route path="*" element={<p>Work in progress</p>} />
  </Routes>
);

export default System;
