import { CSSObject, jsx } from '@emotion/react';
import { ElementType, ReactNode } from 'react';

import { MergeElementProps, scale } from '@scripts/helpers';
import { useFormContext } from 'react-hook-form';

interface LabelBaseProps {
  /** Name for form (inner) */
  name?: string;
  /** Label for Legend */
  label?: string | ReactNode | null;
  /** Flag required for forms */
  required?: boolean;
  /** Label on click handler */
  onClickLabel?: () => void;
}

export interface LegendBaseProps extends LabelBaseProps {
  /** label is bottom position  */
  isLabelBottom?: boolean;
  /** Hint for legend */
  hint?: string;
  /** Type for form */
  type?: string;
  /** Success text */
  success?: string;
  /** Show message flag */
  showMessage?: boolean;
  messageText?: string;
  /** Show error flag */
  showError?: boolean;
  /** Field children */
  children?: ReactNode;
  /** Label css */
  labelCSS?: CSSObject;
  /** Field wrapper css */
  fieldWrapperCSS?: CSSObject;
  /** Hint css */
  hintCSS?: CSSObject;
  /** Error css */
  errorCSS?: CSSObject;
}

const Label = ({
  name = '',
  label,
  required,
  onClickLabel,
  ...props
}: LabelBaseProps) => (
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  <label htmlFor={name} onClick={onClickLabel} {...props}>
    {label && typeof label === 'string' ? <span>{label}</span> : label}
    {!required && (
      <span
        css={{
          marginLeft: scale(1, true),
        }}
      >
        (необязательное)
      </span>
    )}
  </label>
);
export type LegendProps<P extends ElementType = 'div'> = {
  /** Use your own React component for render. */
  as?: P;
} & MergeElementProps<P, LegendBaseProps>;

export const Legend = <T extends ElementType = 'div'>({
  as,
  label,
  required = true,
  hint,
  name,
  showMessage,
  showError = true,
  isLabelBottom,
  messageText = 'Есть изменения',
  labelCSS,
  fieldWrapperCSS,
  children,
  hintCSS,
  errorCSS,
  onClickLabel,
  ...props
}: LegendProps<T>) => {
  delete props.id;

  const { getFieldState } = useFormContext(); // retrieve all hook methods
  const { error, isTouched } = getFieldState(name!);

  return jsx(
    as || 'div',
    props,
    <>
      {!isLabelBottom && label && (
        <Label
          name={name}
          label={label}
          required={required}
          css={labelCSS}
          onClickLabel={onClickLabel}
        />
      )}
      {children && (
        <div css={fieldWrapperCSS}>
          {children}
          {isLabelBottom && label && (
            <Label
              name={name}
              label={label}
              required={required}
              css={labelCSS}
              onClickLabel={onClickLabel}
            />
          )}
        </div>
      )}

      {hint && !error && <div css={hintCSS}>{hint}</div>}
      {error && showError && isTouched && (
        <p
          css={{ ...errorCSS }}
          dangerouslySetInnerHTML={{
            __html: `${error.message}`,
          }}
        />
      )}
      {!error && showMessage ? (
        <p
          css={{ ...hintCSS }}
          dangerouslySetInnerHTML={{
            __html: messageText,
          }}
        />
      ) : null}
    </>,
  );
};

export default Legend;
