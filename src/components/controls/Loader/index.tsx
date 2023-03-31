import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import typography from '@scripts/typography';

const Loader = ({
  message,
  className,
  width = scale(8),
  height = scale(8),
  isFixed = true,
  ...props
}: {
  message?: string;
  className?: string;
  width?: number;
  height?: number;
  isFixed?: boolean;
}) => (
  <div
    css={{
      ...(isFixed && { position: 'fixed', top: 0, left: 0, bottom: 0, right: 0 }),
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: `${colors?.white}${message ? 'cc' : '90'}`,
    }}
    className={className}
  >
    <div css={{ display: 'grid', placeItems: 'center', padding: scale(4) }}>
      <div
        css={{
          width,
          height,
          '::after': {
            content: '""',
            display: 'block',
            height: '100%',
            border: `${scale(1, true)}px solid ${colors?.link}`,
            borderRightColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRadius: '50%',
            animation: 'ring 1000ms linear infinite',
          },
          '@keyframes ring': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        }}
        {...props}
      />
      {message && <h4 css={{ ...typography('h3'), textAlign: 'center', marginTop: scale(2) }}>{message}</h4>}
    </div>
  </div>
);

export default Loader;
