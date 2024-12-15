import { useDispatch, useSelector } from 'react-redux';

import { Timer16State, setTimer16_2 } from '@store/project/timers/timer16';

import Timer16 from './Timer16Component';
import { RootState } from '@store/index';

const TIMER16_2 = () => {
  const dispatch = useDispatch();
  const spi0 = useSelector<RootState, Timer16State>(state => state.project.timers.timer16.timer16_2);

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
