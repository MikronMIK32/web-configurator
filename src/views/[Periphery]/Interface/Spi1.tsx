import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@store/index';
import { SpiState, setSpi1 } from '@store/interface/spi';

import SpiComponent from './SpiComponent';

const Spi1 = () => {
  const dispatch = useDispatch();
  const spi1 = useSelector<RootState, SpiState>(state => state.interface.spi.spi1);

  console.log('spi1=', spi1);

  return (
    <SpiComponent
      name="SPI1"
      initialValues={spi1}
      onSubmit={vals => {
        dispatch(setSpi1(vals));
      }}
    />
  );
};

export default Spi1;
