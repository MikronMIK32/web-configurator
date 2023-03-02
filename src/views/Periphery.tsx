import { colors } from '@scripts/colors';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '@containers/utility/Periphery/Sidebar';
import Microchip from '@components/Microchip';
import PeripheryPage from './[Periphery]';

const isDark = true;

const basename = process.env.BASE_URL;

const Periphery = () => (
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

export default Periphery;
