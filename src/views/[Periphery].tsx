import { Allotment, AllotmentHandle } from 'allotment';
import { lazy, useEffect, useRef } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { DetailsProvider, useDetails } from '@context/details';

import SpinnerSuspense from '@components/SpinnerSuspense';

const Analog = lazy(() => import('@containers/utility/Periphery/Analog'));
const Crypto = lazy(() => import('@containers/utility/Periphery/Crypto'));
const Timers = lazy(() => import('@containers/utility/Periphery/Timers'));
const Interface = lazy(() => import('@containers/utility/Periphery/Interface'));

const SplitPanes = () => {
  const props = useParams();
  const { setCurrentData } = useDetails();

  useEffect(() => {
    setCurrentData(null);

    return () => setCurrentData(null);
  }, [props, setCurrentData]);

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
    <Allotment vertical ref={ref}>
      <Allotment.Pane>
        <div
          css={{
            height: '100%',
            overflow: 'hidden',
            overflowY: 'scroll',
            // paddingBottom: scale(40),
          }}
        >
          <SpinnerSuspense>
            <Routes>
              <Route path="interface/*" element={<Interface />} />
              <Route path="crypto/*" element={<Crypto />} />
              <Route path="analog/*" element={<Analog />} />
              <Route path="timers/*" element={<Timers />} />
              <Route path="*" element={<p>Work in progress</p>} />
            </Routes>
          </SpinnerSuspense>
        </div>
      </Allotment.Pane>
      {/* <Allotment.Pane maxSize={150} snap>
        <DetailsPane />
      </Allotment.Pane> */}
    </Allotment>
  );
};

export default function PeripheryPage() {
  return (
    <DetailsProvider>
      <SplitPanes />
    </DetailsProvider>
  );
}
