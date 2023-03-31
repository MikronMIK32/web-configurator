import { Route, Routes } from 'react-router-dom';

import Spi from './Spi';

const Interface = () => (
  <Routes>
    <Route path="spi" element={<Spi />} />
    <Route path="*" element={<p>Work in progress</p>} />
  </Routes>
);

export default Interface;
