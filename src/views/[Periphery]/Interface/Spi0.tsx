import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@store/index';
import { SpiState, setSpi0 } from '@store/interface/spi';

import SpiComponent from './SpiComponent';

const Spi0 = () => {
  const dispatch = useDispatch();
  const spi0 = useSelector<RootState, SpiState>(state => state.interface.spi.spi0);

  return (
    <SpiComponent
      name="SPI0"
      initialValues={spi0}
      onSubmit={vals => {
        dispatch(setSpi0(vals));
      }}
    />
  );
};

export default Spi0;
