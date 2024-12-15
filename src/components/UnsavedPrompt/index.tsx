// TODO: BaseModal https://github.com/core-ds/core-components/tree/c0780faf90e1e2991acd38a0e67383f15ac30427/packages/base-modal

import Button from '@components/controls/Button';
import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import typography from '@scripts/typography';
import { useCallbackPrompt } from '@scripts/hooks/useCallbackPrompt';

import { useFormState } from 'react-hook-form';

// TODO: Modal https://github.com/core-ds/core-components/tree/c0780faf90e1e2991acd38a0e67383f15ac30427/packages/modal
export const UnsavedPrompt = ({
  isOpen,
  cancelNavigation,
  confirmNavigation,
}: {
  isOpen?: boolean;
  cancelNavigation: () => void;
  confirmNavigation: () => void;
}) => (
  <>
    {isOpen && (
      <div
        css={{
          position: 'fixed',
          zIndex: 999999,
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
        }}
      />
    )}
    {isOpen ? (
      <div
        css={{
          position: 'fixed',
          zIndex: 999999,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          background: 'rgba(255,255,255,.2)',
          padding: scale(5),
          borderRadius: scale(2),
          overflow: 'hidden',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          backdropFilter: 'blur(2px)',
        }}
      >
        <p
          css={{
            marginBottom: scale(3),
            color: colors.white,
            ...typography('labelLarge'),
          }}
        >
          У вас есть несохраненные данные. Вы уверены, что хотите покинуть раздел?
        </p>

        <div css={{ display: 'flex', flexDirection: 'row', gap: scale(2) }}>
          <Button onClick={cancelNavigation}>Остаться на странице</Button>

          <Button onClick={confirmNavigation} variant="danger">
            Не сохранять данные
          </Button>
        </div>
      </div>
    ) : null}
  </>
);

const FormUnsavedPrompt = () => {
  const { isDirty } = useFormState();

  const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(isDirty);

  return (
    <UnsavedPrompt isOpen={showPrompt} cancelNavigation={cancelNavigation} confirmNavigation={confirmNavigation} />
  );
};

export default FormUnsavedPrompt;
