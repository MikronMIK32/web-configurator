import { useFormState } from 'react-hook-form';

import { FormResetTooltip, FormResetTooltipProps } from '@components/FormResetTooltip';
import Button from '@components/controls/Button';

import { colors, shadows } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import typography from '@scripts/typography';

export type FormStickyProps = {
  className?: string;
} & Pick<FormResetTooltipProps, 'onDefaultReset' | 'onReset'>;

export const FormSticky = ({ onDefaultReset, onReset, className }: FormStickyProps) => {
  const { isDirty: isAnyDirty, isValid, dirtyFields } = useFormState();
  const isDirty = isAnyDirty && Object.keys(dirtyFields).length > 0;

  if (!isDirty) return null;

  return (
    <div
      css={{
        position: 'sticky',
        bottom: 0,
        background: colors.white,
        paddingTop: scale(2),
        paddingBottom: scale(2),
        display: 'flex',
        alignItems: 'baseline',
        gap: scale(2),
        boxShadow: shadows.newSliderItemShadow,
      }}
      className={className}
    >
      {isDirty && !isValid && (
        <p
          css={{
            ...typography('labelSmall'),
            color: colors?.errorDark,
          }}
        >
          Исправьте ошибки для сохранения
        </p>
      )}

      {isDirty && (
        <Button size="sm" type="submit" disabled={!isValid}>
          Сохранить
        </Button>
      )}
      <FormResetTooltip onReset={onReset} isDirty={isDirty} isDefaultDirty={isDirty} onDefaultReset={onDefaultReset} />
    </div>
  );
};
