import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import { useLinkCSS } from '@scripts/hooks/useLinkCSS';
import typography from '@scripts/typography';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type TableEmptyProps = {
  filtersActive: boolean;
  titleWithFilters: string;
  titleWithoutFilters: string;
  addItems?: () => void;
  addItemsText?: string;
  onResetFilters?: () => void;
};

export const TableEmpty: FC<TableEmptyProps> = ({
  filtersActive,
  titleWithFilters,
  titleWithoutFilters,
  addItems,
  addItemsText,
  onResetFilters,
}) => {
  const linkStyles = useLinkCSS();
  const navigate = useNavigate();

  return (
    <div
      css={{
        display: 'grid',
        placeItems: 'center',
        padding: scale(4),
        background: colors.white,
      }}
    >
      <p css={{ ...typography('h2'), marginBottom: scale(2) }}>
        {filtersActive ? titleWithFilters : titleWithoutFilters}
      </p>
      <p css={{ ...typography('labelMedium') }}>
        {filtersActive && (
          <>
            Попробуйте изменить или{' '}
            <button
              css={linkStyles}
              type="button"
              onClick={() => {
                if (onResetFilters) onResetFilters();
                else navigate(0);
              }}
            >
              сбросить фильтры
            </button>
          </>
        )}
        {!filtersActive && addItemsText && addItems && (
          <button
            css={linkStyles}
            type="button"
            onClick={() => {
              addItems();
            }}
          >
            {addItemsText}
          </button>
        )}
      </p>
    </div>
  );
};
