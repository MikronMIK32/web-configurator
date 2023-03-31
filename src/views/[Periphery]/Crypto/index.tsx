import { Route, Routes } from 'react-router-dom';

import Crc from './Crc';
import CryptoBlock from './Crypto';

const Crypto = () => (
  <Routes>
    <Route path="crc" element={<Crc />} />
    <Route path="block" element={<CryptoBlock />} />
    <Route path="*" element={<p>Work in progress</p>} />
  </Routes>
);

export default Crypto;
