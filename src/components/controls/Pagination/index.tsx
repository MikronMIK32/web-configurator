import { CSSObject } from '@emotion/react';
import { Link, To, useLocation } from 'react-router-dom';

import Button from '@components/controls/Button';

import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import { useQuery } from '@scripts/hooks/useQuery';
import typography from '@scripts/typography';

import ChevronLeft from '@icons/small/chevronLeft.svg?react';
import ChevronRight from '@icons/small/chevronRight.svg?react';

export interface PaginationProps {
  /** Number of pages */
  pages: number;
  /** Base number of visible pages */
  baseNumberPages?: number;
  // scrollToTop?: boolean;
  className?: string;
  /** for navigation from parent, not query */
  controlledPage?: number;
  /** for controlled from state variation */
  setPage?: (value: number) => void;
  /** for custom disabling */
  disabled?: boolean;
}

const imitationLink: CSSObject = {
  '&:disabled': {
    background: 'none !important',
  },
  '&:hover': {
    fill: colors.primaryHover,
    background: 'none !important',
  },
};

const Pagination = ({
  pages,
  baseNumberPages = 7,
  // scrollToTop = false,
  className,
  controlledPage,
  setPage,
  disabled,
}: PaginationProps) => {
  //   const { pathname, query } = useRouter();
  const { pathname } = useLocation();
  const query = useQuery();

  const page = controlledPage || +(query.page || 1);

  const getParams = (newPage: number): To => ({
    pathname,
    search: `?${new URLSearchParams({
      ...query,
      page: `${newPage}`,
    }).toString()}`,
  });

  const buttonCSS: CSSObject = {
    width: scale(4),
    height: scale(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  const liCSS: CSSObject = {
    width: scale(4),
    height: scale(4),
    display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
    a: buttonCSS,
  };

  // Находим средний элемент для корректного подсчета отклонений
  const centerIndex = Math.ceil(baseNumberPages / 2);

  // В реальном проекте следует заменять значениями констант, например enums
  const determinePosition = () => {
    if (pages > baseNumberPages) {
      if (page < centerIndex) return 'start';

      if (page > pages - centerIndex + 1) return 'end';

      return 'center';
    }
    return 'any';
  };

  const position = determinePosition();

  // Подсчет отображаемых страниц (отображаем либо максимально возможное, либо в зависимости от положения активной страницы)
  const visiblePages =
    // eslint-disable-next-line no-nested-ternary
    position === 'any' ? pages : position === 'center' ? baseNumberPages : baseNumberPages - 1;

  // Функция определяет номер страницы для каждого элемента массива (подсчет ведется от 1го)
  const getItem = (pageNumber: number) => {
    if (position === 'any') return pageNumber;

    if (pageNumber === 1) return pageNumber;

    if (pageNumber === visiblePages) return pages;

    if ((pageNumber === 2 && position !== 'start') || (pageNumber === visiblePages - 1 && position !== 'end')) {
      return null;
    }

    if (position === 'center') {
      return page + pageNumber - centerIndex;
    }

    if (position === 'end') {
      return pages + pageNumber - visiblePages;
    }

    if (position === 'start') {
      return pageNumber;
    }
    return undefined;
  };

  const paginationArray = Array.from({ length: visiblePages }, (_, i) => getItem(i + 1));

  if (pages < 2) return null;

  return (
    <ul css={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className={className}>
      <li css={liCSS}>
        {setPage ? (
          <Button
            variant="ghost"
            size="sm"
            Icon={ChevronLeft}
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page === 1 || disabled}
            css={{
              height: '100%',
              marginRight: scale(1),
              ...(page === 1 && {
                fill: colors.grey600,
                pointerEvents: 'none',
              }),
              ...imitationLink,
            }}
          >
            {' '}
          </Button>
        ) : (
          <Link
            to={getParams(page - 1)}
            // scroll={scrollToTop}
            css={{
              ...buttonCSS,
              ...(page === 1 && {
                fill: colors.grey600,
                pointerEvents: 'none',
              }),
              '&:hover': {
                fill: colors.primaryHover,
              },
            }}
          >
            <ChevronLeft />
          </Link>
        )}
      </li>

      {paginationArray.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index} css={{ ...typography('labelMedium'), ...liCSS }}>
          {
            // eslint-disable-next-line no-nested-ternary
            item ? (
              // eslint-disable-next-line no-nested-ternary
              item === page ? (
                <span
                  css={{
                    ...buttonCSS,
                    ...typography('paragraphSmall'),
                    fill: colors.black,
                    border: `1px solid ${colors.primary}`,
                    borderRadius: '2px',
                    cursor: 'default',
                  }}
                >
                  {item}
                </span>
              ) : setPage ? (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setPage(item);
                  }}
                  disabled={disabled}
                  // @ts-ignore
                  css={{
                    ...buttonCSS,
                    '&:hover': {
                      background: 'none !important',
                      border: `1px solid ${colors.primary}`,
                    },
                    fontWeight: '400 !important',
                  }}
                >
                  {item}
                </Button>
              ) : (
                <Link
                  to={getParams(item)}
                  css={{
                    ...typography('paragraphSmall'),
                    ...buttonCSS,
                    borderRadius: '2px',
                    border: `1px solid transparent`,
                    '&:hover': {
                      border: `1px solid ${colors.primaryHover}`,
                    },
                  }}
                >
                  {item}
                </Link>
              )
            ) : (
              <span css={typography('paragraphSmall')}>...</span>
            )
          }
        </li>
      ))}

      <li css={{ ...liCSS }}>
        {setPage ? (
          <Button
            variant="ghost"
            size="sm"
            Icon={ChevronRight}
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={page === pages || disabled}
            css={{
              height: '100%',
              marginLeft: scale(1),
              ...(page === pages && {
                fill: colors.grey600,
                pointerEvents: 'none',
              }),
              ...imitationLink,
            }}
          >
            {' '}
          </Button>
        ) : (
          <Link
            to={getParams(page + 1)}
            css={{
              ...buttonCSS,
              ...(page === pages && {
                fill: colors.grey600,
                pointerEvents: 'none',
              }),
              '&:hover': {
                fill: colors.primaryHover,
              },
            }}
          >
            <ChevronRight />
          </Link>
        )}
      </li>
    </ul>
  );
};

export default Pagination;
