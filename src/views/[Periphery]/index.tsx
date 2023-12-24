import { Allotment, AllotmentHandle } from 'allotment';
import { Suspense, lazy, useEffect, useRef } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { DetailsProvider, useDetails } from '@context/details';

import { PeripheryWrapper } from '@components/PeripheryWrapper';

import { scale } from '@scripts/helpers';

const Analog = lazy(() => import('./Analog'));
const System = lazy(() => import('./System'));
const Crypto = lazy(() => import('./Crypto'));
const Timers = lazy(() => import('./Timers'));
const Interface = lazy(() => import('./Interface'));

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
            position: 'relative',
          }}
        >
          <div
            css={{
              padding: scale(2),
              height: '100%',
            }}
          >
            <Suspense fallback={<PeripheryWrapper isLoading />}>
              <Routes>
                <Route path="interface/*" element={<Interface />} />
                <Route path="crypto/*" element={<Crypto />} />
                <Route path="analog/*" element={<Analog />} />
                <Route path="timers/*" element={<Timers />} />
                <Route path="system/*" element={<System />} />
                <Route path="*" element={<p>Work in progress</p>} />
              </Routes>
            </Suspense>
          </div>
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
