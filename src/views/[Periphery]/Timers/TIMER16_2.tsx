import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@store/index';
import { Timer16State, setTimer16_2 } from '@store/timers/timer16';

import Timer16 from './Timer16Component';

const TIMER16_2 = () => {
  const dispatch = useDispatch();
  const spi0 = useSelector<RootState, Timer16State>(state => state.timers.timer16.timer16_2);

  return (
    <Timer16
      timerNumber={2}
      name="TIMER16_2"
      initialValues={spi0}
      onSubmit={vals => {
        dispatch(setTimer16_2(vals));
      }}
    />
  );
};

export default TIMER16_2;
