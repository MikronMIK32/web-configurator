import { Allotment, AllotmentHandle } from 'allotment';
import 'allotment/dist/style.css';
import { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Microchip from '@components/Microchip';

import { colors } from '@scripts/colors';

import PeripheryPage from '../[Periphery]';
import Sidebar from './Sidebar';

const isDark = true;

const basename = process.env.BASE_URL;

const PeripheriesView = () => {
  const ref = useRef<AllotmentHandle>(null);

  useEffect(() => {
    const handle = ref.current;

    const onresize = () => {
      handle?.reset();
    };

    window.addEventListener('resize', onresize);

    return () => {
      window.removeEventListener('resize', onresize);
    };
  }, []);

  return (
    <BrowserRouter basename={basename}>
      <Allotment proportionalLayout={false} ref={ref}>
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
};

export default PeripheriesView;
