import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@store/index';
import { Timer16State, setTimer16_0 } from '@store/project/timers/timer16';

import Timer16 from './Timer16Component';

const TIMER16_0 = () => {
  const dispatch = useDispatch();
  const spi0 = useSelector<RootState, Timer16State>(state => state.project.timers.timer16.timer16_0);

  return (
    <Timer16
      timerNumber={0}
      name="TIMER16_0"
      initialValues={spi0}
      onSubmit={vals => {
        dispatch(setTimer16_0(vals));
      }}
    />
  );
};

export default TIMER16_0;
