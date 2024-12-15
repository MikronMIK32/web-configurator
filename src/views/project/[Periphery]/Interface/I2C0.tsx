import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@store/index';
import { I2CState, setI2C0 } from '@store/project/interface/i2c';

import I2CComponent from './I2CComponent';

const I2C0 = () => {
  const dispatch = useDispatch();
  const i2c0 = useSelector<RootState, I2CState>(state => state.project.interface.i2c.i2c0);

  return (
    <I2CComponent
      name="I2C0"
      initialValues={i2c0}
      onSubmit={vals => {
        dispatch(setI2C0(vals));
      }}
    />
  );
};

export default I2C0;
