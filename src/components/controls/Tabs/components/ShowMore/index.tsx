import { FC } from 'react';

import {
  Arrow,
  BaseSelect,
  Optgroup as DefaultOptgroup,
  OptionsList as DefaultOptionsList,
  FieldProps,
  Option,
} from '@controls/NewSelect';

import { useTabsTheme } from '../../context';
import { ShowMoreButtonProps } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ButtonField = ({ count, innerProps, Arrow, className, disabled, id }: FieldProps & { count?: number }) => {
  const { getCSS } = useTabsTheme();

  const { ref, ...restInnerProps } = innerProps;

  return (
    <div ref={ref} css={{ display: 'flex' }}>
      <button
        type="button"
        css={getCSS('showMoreButton')}
        className={className}
        disabled={disabled}
        id={id}
        {...(restInnerProps as any)}
      >
        Больше ({count}) {Arrow}
      </button>
    </div>
  );
};

export const ShowMoreButton: FC<ShowMoreButtonProps> = ({
  Optgroup = DefaultOptgroup,
  OptionsList = DefaultOptionsList,
  count,
  onChange,
  options,
  ...props
}) => (
  <BaseSelect
    {...props}
    Arrow={Arrow}
    options={options}
    optionProps={{ Checkmark: null }}
    Option={Option}
    size="sm"
    Optgroup={Optgroup}
    OptionsList={OptionsList}
    Field={ButtonField}
    fieldProps={{ count }}
    selected={[]}
    closeOnSelect
    onChange={onChange}
    popoverPosition="bottom-end"
    css={{
      display: 'flex',
      height: '100%',
    }}
    circularNavigation
  />
);
