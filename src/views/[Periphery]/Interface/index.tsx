import { Route, Routes } from 'react-router-dom';

import Spi0 from './Spi0';
import Spi1 from './Spi1';
import I2C0 from './I2C0';
import I2C1 from './I2C1';
import Usart from './Usart';

const Interface = () => (
  <Routes>
    <Route path="spi0" element={<Spi0 />} />
    <Route path="spi1" element={<Spi1 />} />
    <Route path="i2c0" element={<I2C0 />} />
    <Route path="i2c1" element={<I2C1 />} />
    <Route path="usart" element={<Usart />} />
  </Routes>
);

export default Interface;
