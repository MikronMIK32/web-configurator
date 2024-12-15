import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@store/index';
import { I2CState, setI2C1 } from '@store/project/interface/i2c';

import I2CComponent from './I2CComponent';

const I2C1 = () => {
  const dispatch = useDispatch();
  const i2c1 = useSelector<RootState, I2CState>(state => state.project.interface.i2c.i2c1);

  return (
    <I2CComponent
      name="I2C1"
      initialValues={i2c1}
      onSubmit={vals => {
        dispatch(setI2C1(vals));
      }}
    />
  );
};

export default I2C1;
