import { scale } from '@scripts/helpers';
import typography from '@scripts/typography';
import { OptgroupProps } from '../../types';

export const Optgroup = ({ children, className, label }: OptgroupProps) => (
  <>
    <div
      className={className}
      css={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: scale(1),
        minHeight: scale(5),
        "& + *[role='option']:before": {
          display: 'none',
        },
        // TODO:
        // ...(size === 'lg' && {
        //     padding: scale(2),
        // }),
      }}
    >
      <p
        css={{
          ...typography('labelMedium'),
        }}
      >
        {label}
      </p>
    </div>
    {children}
  </>
);
