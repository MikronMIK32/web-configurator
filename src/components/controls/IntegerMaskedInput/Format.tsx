import { FieldProps, SimpleSelect } from '@controls/NewSelect';

import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';

import type { IntegerMaskedFormatProps } from './types';
import { FORMAT_OPTIONS } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ButtonField = ({ innerProps, Arrow, className, disabled, id, format }: FieldProps & { format?: string }) => {
  const { ref, ...restInnerProps } = innerProps;

  return (
    <div css={{ display: 'flex' }}>
      <button
        ref={ref}
        type="button"
        className={className}
        disabled={disabled}
        id={id}
        {...(restInnerProps as any)}
        css={{
          display: 'flex',
          gap: scale(1),
        }}
      >
        <span css={{ textTransform: 'uppercase' }}>{format}</span>
        {Arrow}
      </button>
    </div>
  );
};

export const Format = ({ format, onChange, inputRef, disabled }: IntegerMaskedFormatProps) => (
  <SimpleSelect
    Field={ButtonField}
    selected={FORMAT_OPTIONS.filter(e => e.value === format)}
    onChange={e => {
      onChange((e.selected?.value || null) as any);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }}
    options={FORMAT_OPTIONS}
    popoverPosition="bottom-end"
    size="md"
    disabled={disabled}
    fieldProps={{
      format,
    }}
    css={{
      height: '100%',
      borderLeft: `1px solid ${colors.grey400}`,
      paddingLeft: scale(2),
      display: 'flex',
      alignItems: 'center',
    }}
  />
);
