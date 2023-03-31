import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Microchip from '@components/Microchip';

import { colors } from '@scripts/colors';

import PeripheryPage from '../[Periphery]';
import Sidebar from './Sidebar';

const isDark = true;

const basename = process.env.BASE_URL;

const PeripheriesView = () => (
  <BrowserRouter basename={basename}>
    <Allotment proportionalLayout={false}>
      <Allotment.Pane maxSize={300} minSize={200}>
        <Sidebar
          isDark={isDark}
          css={{
            ...(isDark && {
              background: colors.black,
            }),
            height: '100%',
          }}
        />
      </Allotment.Pane>
      <Allotment.Pane minSize={500} preferredSize={1200}>
        <Allotment>
          <Allotment.Pane>
            <Routes>
              <Route path="/periphery/*" element={<PeripheryPage />} />
            </Routes>
          </Allotment.Pane>
          <Allotment.Pane>
            <Microchip />
          </Allotment.Pane>
        </Allotment>
      </Allotment.Pane>
    </Allotment>
  </BrowserRouter>
);

export default PeripheriesView;
