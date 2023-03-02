import styled from '@emotion/styled';
import { FC } from 'react';
import ArrowDownIcon from '@icons/small/chevronDown.svg';
import typography from '@scripts/typography';
import { scale } from '@scripts/helpers';
import { colors } from '@scripts/colors';

export const StyledHeadCell = styled.th({
  ...typography('paragraphSmall'),
  color: colors.grey600,
  padding: scale(3, true),
  textAlign: 'left',
  borderBottom: `1px solid ${colors.grey300}`,
  whiteSpace: 'nowrap',
  verticalAlign: 'center',
  background: colors.white,
  height: scale(3),
  '&:first-of-type': { paddingLeft: scale(2) },
  '&:last-of-type': { paddingRight: scale(2) },
});

export const StyledCell = styled.td({
  verticalAlign: 'top',
  padding: scale(1),
  ...typography('paragraphSmall'),
  '&:first-of-type': { paddingLeft: scale(2) },
  '&:last-of-type': { paddingRight: scale(2) },
});

export const StyledRow = styled.tr(() => ({
  background: colors.white,
  borderBottom: `1px solid ${colors.grey200}`,
  cursor: 'default !important',
}));

export const SortingIcon: FC<{ isSortedDesc: boolean | undefined }> = ({
  isSortedDesc,
}) => (
  <ArrowDownIcon
    css={{
      marginLeft: scale(1),
      marginBottom: -scale(1, true),
      fill: colors?.primary,
      verticalAlign: 'text-bottom',
      transformOrigin: 'center',
      transition: 'transform 0.1s ease-in-out',
      ...(isSortedDesc && {
        transform: 'rotate(-180deg)',
      }),
    }}
  />
);
