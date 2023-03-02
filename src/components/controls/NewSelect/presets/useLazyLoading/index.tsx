import { FC, ReactNode, Reducer, useCallback, useEffect, useMemo, useReducer, useRef } from 'react';

import { InputProps } from '@controls/Input';

import { scale } from '@scripts/helpers';

import { Option as DefaultOption } from '../../components/option';
import { OptionProps, OptionShape } from '../../types';

const DEBOUNCE_TIMEOUT = 300;

type OptionsFetcherResponse = {
  options: OptionShape[];
  hasMore: boolean;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export type useLazyLoadingProps = {
  isValuesLoading?: boolean;
  clearOnClose?: boolean;

  /** Количество элементов на "странице" */
  limit?: number;

  /** Начальный номер "страницы" */
  initialOffset?: number;

  /** Скелетон загружаемых элементов */
  skeleton?: ReactNode;

  /** Компонент пункта меню */
  Option?: FC<OptionProps>;

  /**
   * Функция-загрузчик опций.
   * @param offset - текущая страница
   * @param limit - количество элементов на странице
   * @param queryString - строчные данные, пробрасываемые для поиска из кастомного инпута, расположенного в заголовке OptionsList
   * @returns Promise<{
   *  options - список опций следующей "страницы". Они аппендятся к предыдущим
   *  hasMore - указывает, есть ли еще незагруженные элементы (в случае false перестает загружать "следующую страницу")
   * }>
   */
  optionsFetcher(offset: number, limit: number, queryString?: string): Promise<OptionsFetcherResponse>;
};

const actions = {
  fetchOptionsStart() {
    return { type: 'FETCH_OPTIONS_START' } as const;
  },
  fetchOptionsBreak() {
    return { type: 'FETCH_OPTIONS_BREAK' } as const;
  },
  fetchOptionsSuccess(payload: { options: OptionShape[]; hasMore: boolean }) {
    return { type: 'FETCH_OPTIONS_SUCCESS', payload } as const;
  },
  setIsOpened(opened: boolean) {
    return { type: 'SET_IS_OPENED', payload: opened } as const;
  },
  setQueryString(qs: string, resetOptions: boolean = true) {
    return { type: 'SET_QUERY_STRING', payload: { qs, resetOptions } } as const;
  },
  reset() {
    return { type: 'RESET' } as const;
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Actions = typeof actions extends { [key: string]: (...args: any) => infer U } ? U : never;

export function useLazyLoading({
  limit = 10,
  initialOffset = 0,
  optionsFetcher,
  skeleton = <div css={{ background: '#ececec', height: scale(3) }} />,
  Option = DefaultOption,
  isValuesLoading = false,
  clearOnClose = true,
}: useLazyLoadingProps) {
  const lazyLoadingInitialState = useMemo(
    () => ({
      opened: false,
      offset: initialOffset,
      options: [] as OptionShape[],
      loading: false,
      allOptionsLoaded: false,
      queryString: '',
    }),
    [initialOffset]
  );

  const lazyLoadingReducer: Reducer<typeof lazyLoadingInitialState, Actions> = (state, action) => {
    switch (action.type) {
      case 'FETCH_OPTIONS_START': {
        return {
          ...state,
          loading: true,
        };
      }
      case 'FETCH_OPTIONS_BREAK': {
        return {
          ...state,
          loading: false,
        };
      }
      case 'FETCH_OPTIONS_SUCCESS': {
        const optionsMap = new Map<any, OptionShape>();

        state.options.forEach(option => {
          optionsMap.set(option.value, option);
        });

        action.payload.options.forEach(option => {
          optionsMap.set(option.value, option);
        });

        const options = [...optionsMap.values()];

        return {
          ...state,
          options,
          offset: state.offset + (options.length ? limit : 0),
          allOptionsLoaded: !action.payload.hasMore,
          loading: false,
        };
      }
      case 'SET_IS_OPENED': {
        return {
          ...state,
          opened: action.payload,
        };
      }
      case 'SET_QUERY_STRING': {
        return {
          ...lazyLoadingInitialState,
          opened: state.opened,
          loading: true,
          queryString: action.payload.qs,
          ...(!action.payload.resetOptions && {
            options: state.options,
          }),
        };
      }
      case 'RESET': {
        return {
          ...lazyLoadingInitialState,
        };
      }
      default: {
        return state;
      }
    }
  };

  const [{ opened, offset, options, loading, allOptionsLoaded, queryString }, dispatch] = useReducer(
    lazyLoadingReducer,
    lazyLoadingInitialState
  );

  const abortFetchingOptionsRef = useRef<() => void>();

  const fetchNextOffsetOptions = useCallback(() => {
    dispatch(actions.fetchOptionsStart());

    new Promise<OptionsFetcherResponse>((resolve, reject) => {
      // eslint-disable-next-line no-unused-expressions
      abortFetchingOptionsRef.current?.();
      abortFetchingOptionsRef.current = reject;
      optionsFetcher(offset, limit, queryString).then(res => {
        resolve(res);
      });
    })
      .then(res => {
        dispatch(actions.fetchOptionsSuccess(res));
        abortFetchingOptionsRef.current = undefined;
      })
      .catch(
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {}
      );
  }, [optionsFetcher, offset, limit, queryString]);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (opened && !loading && !allOptionsLoaded) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (observer) {
              observer.disconnect();
            }
            fetchNextOffsetOptions();
          }
        },
        {
          root: listRef.current,
        }
      );

      /*
       * Обсервим пересечение последней опции с контейнером.
       * Таким образом, загрузка следующей "страницы" начнется когда юзер доскроллит список
       * до верхнего края последней опции, что обеспечивает плавность
       */
      const options = listRef.current?.querySelectorAll('[role="option"]');
      const lastOption = options?.[options.length - 1];

      if (lastOption) {
        observer.observe(lastOption);
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [offset, fetchNextOffsetOptions, opened, allOptionsLoaded, initialOffset, loading]);

  const onOpen = useCallback(
    (payload: { open?: boolean }) => {
      if (payload.open) {
        fetchNextOffsetOptions();
      } else {
        // eslint-disable-next-line no-unused-expressions
        abortFetchingOptionsRef.current?.();

        if (clearOnClose) {
          dispatch(actions.setQueryString('', false));
        }
        dispatch(actions.fetchOptionsBreak());
      }

      dispatch(actions.setIsOpened(payload.open ?? false));
    },
    [fetchNextOffsetOptions, clearOnClose]
  );

  const fetchNextOptionsRef = useRef<() => void>();
  const fetchNextOptionsTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    fetchNextOptionsRef.current = fetchNextOffsetOptions;
  }, [fetchNextOffsetOptions]);

  const onQueryStringChange = useCallback<Exclude<InputProps['onChange'], undefined>>((_, payload) => {
    dispatch(actions.setQueryString(payload.value));
    /* eslint-disable no-unused-expressions */

    /*
     * Если во время загрузки опций юзер ввел новый текст в инпут,
     * нужно прервать текущую загрузку, чтобы неактуальные опции не попали в выдачу
     */
    abortFetchingOptionsRef.current?.();

    listRef.current?.scrollTo({ top: 0 });

    /* Дебаунсим ввод текста, чтобы не отправлять запрос к новым опциям на каждый чих */
    if (fetchNextOptionsTimerRef.current) {
      clearTimeout(fetchNextOptionsTimerRef.current);
    }
    fetchNextOptionsTimerRef.current = setTimeout(() => {
      /*
       * После дебаунса необходимо вызвать функцию-загрузчик,
       * содержащую актуальные на данный момент данные оффсета и queryString.
       * Поэтому мы не можем обратиться напрямую к функции fetchNextOptions,
       * так как она будет замкнута на старые значения, актуальные на момент вызова хэндлера,
       * так что берем ее из обновляемого рефа
       */
      fetchNextOptionsRef.current?.();
    }, DEBOUNCE_TIMEOUT);
    /* eslint-enable */
  }, []);

  const renderOption = (props: OptionProps) => <Option {...props} highlighted={loading ? false : props.highlighted} />;

  const skeletonOptions: OptionShape[] = useMemo(
    () =>
      Array(loading ? limit : 0)
        .fill(0)
        .map((_, key) => ({
          key: `loading-${key}`,
          disabled: true,
          content: skeleton,
          isPreloader: true,
        })),
    [loading, limit, skeleton]
  );

  const reset = useCallback(() => {
    dispatch(actions.reset());
  }, []);

  return {
    isLoading: loading || isValuesLoading,
    isNotFound: !loading && !!queryString.length,
    optionsProps: {
      Option: renderOption,
      options: [...options, ...skeletonOptions],
      optionsListProps: {
        ref: listRef,
        inputProps: {
          onChange: onQueryStringChange,
          value: queryString,
        },
      },
      onOpen,
    },
    setValue: (value: string, revalidate = true) => {
      if (revalidate) {
        onQueryStringChange({} as any, { value });
        return;
      }

      dispatch(actions.setQueryString(value, false));
    },
    reset,
  };
}
