import { jsx } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ElementType, Ref, forwardRef, useMemo } from 'react';

import { useThemeCSS } from '@scripts/theme';

import { buttonThemes } from './themes/index';
import { ButtonProps, ButtonStateFull } from './types';

export * from './types';

/**
 * Button component.
 *
 * Renders <button /> or <a /> (pass `href`) or any custom element (pass `as`).
 *
 * Define themes and sizes in theme object (`components.Button`) and use them as `theme` / `size` prop values.
 */
const Button = <T extends ElementType = 'button'>(
  {
    children,
    block = false,
    size = 'md',
    theme = buttonThemes.basic,
    variant = 'primary',
    Icon,
    FaIcon,
    iconAfter = false,
    hidden = false,
    type = 'button',
    as,
    external = false,
    disabled = false,
    rounded = true,
    css,
    ...props
  }: ButtonProps<T>,
  ref: Ref<HTMLButtonElement>
) => {
  const hasChildren = !!children;
  const state = useMemo<ButtonStateFull>(
    () => ({
      disabled,
      hasChildren,
      hidden,
      size,
      variant,
      block,
      iconAfter,
      rounded,
    }),
    [block, disabled, hasChildren, hidden, iconAfter, size, variant, rounded]
  );

  const { button: totalCSS, icon: iconCSS } = useThemeCSS(theme, state);

  let icon = null;

  if (FaIcon) {
    icon = <FontAwesomeIcon icon={FaIcon} className="fa-fw" css={iconCSS} />;
  } else if (Icon) {
    icon = <Icon css={iconCSS} />;
  }

  return jsx(
    as || 'button',
    {
      ref,
      type: !as || as === 'button' ? type : null,
      target: external ? '_blank' : null,
      rel: external ? 'nofollow noopener' : null,
      css: [totalCSS, css],
      disabled,
      ...props,
    },
    <>
      {icon && !iconAfter && icon}
      {hidden ? '' : children}
      {icon && iconAfter && icon}
    </>
  );
};

export default forwardRef(Button) as typeof Button;
