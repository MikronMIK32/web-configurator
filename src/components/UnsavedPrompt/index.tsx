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
}) =>
  isOpen ? (
    <div
      css={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999999,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)',
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
  ) : null;

const FormUnsavedPrompt = () => {
  const { isDirty } = useFormState();

  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(isDirty);

  return (
    <UnsavedPrompt
      isOpen={showPrompt}
      cancelNavigation={cancelNavigation}
      confirmNavigation={confirmNavigation}
    />
  );
};

export default FormUnsavedPrompt;
