import { useDetails } from '@context/details';

import { scale } from '@scripts/helpers';

// TODO: оставить только стили тут, а контент насыщать через containers
const DetailsPane = () => {
  const { currentData /* setEnabled */ } = useDetails();

  return (
    <div>
      <div css={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4 css={{ marginBottom: scale(1) }}>{currentData?.title || 'Не выбрано'}</h4>
        {/* <span onClick={() => setEnabled(false)}>x</span> */}
      </div>
      {currentData && <p>{currentData?.description}</p>}
    </div>
  );
};

export default DetailsPane;
