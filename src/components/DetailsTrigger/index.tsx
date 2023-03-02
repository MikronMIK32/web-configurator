import { IconDefinition, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SVGRIcon } from '@customTypes/index';

import Tooltip from '@components/controls/Tooltip';

import { colors } from '@scripts/colors';

export interface DetailsTriggerProps {
  title: string;
  description: string;
  Icon?: SVGRIcon | IconDefinition;
}

export const DetailsTrigger = ({ title, description, Icon = faCircleInfo }: DetailsTriggerProps) => (
  // const { currentData, setCurrentData, enabled } = useDetails();
  // const isActive = currentData?.id === id;

  <Tooltip
    trigger="click"
    content={
      <>
        <h4>{title}</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: description,
          }}
          css={{
            ul: {
              listStyle: 'disc',
              display: 'block',
              paddingLeft: 14,
            },
            li: {
              listStyle: 'disc',
              margin: 0,
              paddingLeft: 0,
            },
          }}
        />
      </>
    }
    hideOnClick
    interactive={false}
  >
    <button
      type="button"
      css={{
        fill: colors.blue,
        color: colors.blue,
        ':hover': {
          opacity: 0.7,
        },
      }}
      onFocus={e => {
        e.stopPropagation();
      }}
    >
      {typeof Icon === 'function' ? <Icon /> : <FontAwesomeIcon icon={Icon} />}
    </button>
  </Tooltip>
);
