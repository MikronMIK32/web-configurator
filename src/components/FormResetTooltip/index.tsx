import { faRotateBack } from '@fortawesome/free-solid-svg-icons';
import React, { ReactNode } from 'react';

import Button from '@components/controls/Button';
import Tooltip from '@components/controls/Tooltip';

import { scale } from '@scripts/helpers';

export interface FormResetTooltipProps {
  isDirty: boolean;
  isDefaultDirty: boolean;
  onDefaultReset: () => void;
  onReset: () => void;
  children?: ReactNode | ReactNode[];
}

export const FormResetTooltip = ({
  children,
  onReset,
  onDefaultReset,
  isDirty,
  isDefaultDirty,
}: FormResetTooltipProps) => {
  if (!isDefaultDirty && !isDirty) return null;

  return isDirty ? (
    <Tooltip
      theme="light"
      content={
        <div css={{ display: 'flex', flexDirection: 'column', gap: scale(1) }}>
          <Button type="button" size="sm" onClick={onReset}>
            Сбросить до предыдущих значений
          </Button>
          <Button type="button" size="sm" onClick={onDefaultReset} FaIcon={faRotateBack}>
            Сбросить по-умолчанию
          </Button>
        </div>
      }
      interactive
    >
      <div>
        {!children ? (
          <Button type="button" size="sm" variant="ghost">
            Сбросить
          </Button>
        ) : (
          children
        )}
      </div>
    </Tooltip>
  ) : (
    <Button type="button" size="sm" variant="danger" FaIcon={faRotateBack} onClick={onDefaultReset}>
      Сбросить по-умолчанию
    </Button>
  );
};
