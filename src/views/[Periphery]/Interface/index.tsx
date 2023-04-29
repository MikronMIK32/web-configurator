import { Route, Routes } from 'react-router-dom';

import Spi0 from './Spi0';
import Spi1 from './Spi1';

const Interface = () => (
  <Routes>
    <Route path="spi0" element={<Spi0 />} />
    <Route path="spi1" element={<Spi1 />} />
    <Route path="*" element={<p>Work in progress</p>} />
  </Routes>
);

export default Interface;
