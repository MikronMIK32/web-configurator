/* eslint-disable no-nested-ternary */
import {
  ChangeEvent,
  FC,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import FormControl, { FormControlProps } from '@controls/FormControl';
import { FieldProps } from '@controls/NewSelect';
import DefaultTag from '@controls/Tags/Tag';

import { scale } from '@scripts/helpers';
import { useInputCSS } from '@scripts/hooks/useInputCSS';

import { calculateTotalElementsPerRow } from './calculate-collapse-size';
import { TagComponent } from './types';

type TagListOwnProps = {
  value?: string;
  handleDeleteTag?: (key: string) => void;
  onInput?: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef?: MutableRefObject<HTMLInputElement>;
  autocomplete?: boolean;
  isPopoverOpen?: boolean;
  collapseTagList?: boolean;
  moveInputToNewLine?: boolean;
  transformCollapsedTagText?: (collapsedCount: number) => string;
  transformTagText?: (tagText?: ReactNode) => ReactNode;
  Tag?: TagComponent;
  handleUpdatePopover?: () => void;
  rightAddons?: ReactNode;
  isLoading?: boolean;
};

export const TagList: FC<FieldProps & FormControlProps & TagListOwnProps> = ({
  size = 'md',
  open,
  disabled,
  placeholder,
  selectedMultiple = [],
  Arrow,
  innerProps,
  className,
  fieldCSS,
  value = '',
  rightAddons,
  autocomplete,
  isLoading = false,
  label,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  valueRenderer,
  onInput,
  handleDeleteTag,
  collapseTagList,
  moveInputToNewLine,
  transformCollapsedTagText,
  transformTagText,
  isPopoverOpen,
  handleUpdatePopover,
  Tag = DefaultTag,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedItems,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toggleMenu,
  ...restProps
}) => {
  const [focused, setFocused] = useState(false);
  const [isShowMoreEnabled, setShowMoreEnabled] = useState<boolean | undefined>(false);
  const [visibleElements, setVisibleElements] = useState(1);
  const [inputOnNewLine, setInputOnNewLine] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setShowMoreEnabled(isPopoverOpen);
  }, [isPopoverOpen]);

  useLayoutEffect(() => {
    setVisibleElements(selectedMultiple.length);
    setShowMoreEnabled(false);
  }, [selectedMultiple]);

  useLayoutEffect(() => {
    if (collapseTagList && contentWrapperRef.current) {
      const totalVisibleElements = calculateTotalElementsPerRow(
        contentWrapperRef.current,
        autocomplete && inputRef.current ? inputRef.current : null
      );

      setVisibleElements(totalVisibleElements);
    }
  }, [collapseTagList, visibleElements, autocomplete]);

  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => setFocused(false), []);

  const inputTextIsOverflow = useCallback(
    () => inputRef.current && inputRef.current.scrollWidth > inputRef.current.clientWidth,
    []
  );

  const handleMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const { onClick, ...restInnerProps } = innerProps;

  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    event => {
      if (onClick && contentWrapperRef.current) {
        const eventTarget = event.target as HTMLDivElement;

        const clickedInsideContent =
          eventTarget !== contentWrapperRef.current && contentWrapperRef.current.contains(eventTarget);

        if (!clickedInsideContent) {
          onClick(event);
        }
      }

      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [onClick]
  );

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    event => {
      const lastSelectedTag = selectedMultiple[selectedMultiple.length - 1];

      if (event.key === 'Backspace' && !value && handleDeleteTag && lastSelectedTag) {
        handleDeleteTag(lastSelectedTag.key);
      }
    },
    [handleDeleteTag, selectedMultiple, value]
  );

  const toggleCollapseRef = useRef<HTMLButtonElement>(null);

  const toggleShowMoreLessButton = useCallback<MouseEventHandler<HTMLButtonElement>>(
    event => {
      toggleCollapseRef.current?.focus();
      if (event) {
        event.stopPropagation();
        setShowMoreEnabled(v => !v);
        if (handleUpdatePopover) {
          handleUpdatePopover();
        }
      }
    },
    [handleUpdatePopover]
  );

  useEffect(() => {
    /**
     * Если текст не помещается в инпут, то нужно перенести инпут на новую строку.
     */
    if (moveInputToNewLine) {
      setInputOnNewLine(old => {
        if (inputTextIsOverflow() && !old) {
          return true;
        }

        if (value.length === 0) {
          return false;
        }

        return old;
      });
    }
  }, [value, inputTextIsOverflow, moveInputToNewLine]);

  const collapseTagTitle = useMemo(() => {
    if (isShowMoreEnabled) {
      return 'Свернуть';
    }
    if (transformCollapsedTagText) {
      return transformCollapsedTagText(selectedMultiple.length - visibleElements);
    }

    return `+${selectedMultiple.length - visibleElements}`;
  }, [transformCollapsedTagText, isShowMoreEnabled, selectedMultiple.length, visibleElements]);

  const filled = Boolean(selectedMultiple.length > 0) || Boolean(value);

  const baseCSS = useInputCSS();

  return (
    <div ref={wrapperRef} onFocus={handleFocus} onBlur={handleBlur} className={className}>
      <FormControl
        {...restProps}
        ref={innerProps.ref}
        block
        size={size}
        focused={open || focused}
        disabled={disabled}
        filled={filled || !!placeholder}
        onMouseDown={handleMouseDown}
        rightAddons={
          <>
            {rightAddons}
            {Arrow}
          </>
        }
        onClick={handleClick}
        label={label}
        labelCSS={{}}
        css={fieldCSS}
      >
        <div
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            padding: `${scale(1, true)}px ${scale(1)}px`,
            gap: scale(1, true),
          }}
          ref={contentWrapperRef}
        >
          {selectedMultiple.map((option, index) =>
            isShowMoreEnabled || index + 1 <= visibleElements ? (
              <Tag key={option.key} onDelete={isLoading ? undefined : () => handleDeleteTag?.(option.key)}>
                {option.content ? (
                  transformTagText ? (
                    transformTagText(option.content)
                  ) : (
                    option.content
                  )
                ) : option.isPreloader ? (
                  <div css={{ width: scale(12), height: scale(2), alignSelf: 'center', background: '#ececec' }} />
                ) : (
                  option.key
                )}
              </Tag>
            ) : null
          )}
          {visibleElements < selectedMultiple.length && (
            <Tag
              data-collapse="collapse-last-tag-element"
              onClick={toggleShowMoreLessButton}
              key="collapse"
              ref={toggleCollapseRef}
            >
              {collapseTagTitle}
            </Tag>
          )}

          {autocomplete && (
            <input
              {...restInnerProps}
              autoComplete="off"
              ref={inputRef}
              value={value}
              onChange={onInput}
              css={{
                ...baseCSS,
                flexGrow: 1,
                flexBasis: scale(6),
                minWidth: scale(6),
                minHeight: scale(3),
                ...(inputOnNewLine && { minWidth: '100%' }),
              }}
              disabled={disabled}
              onKeyDown={handleKeyDown}
              placeholder={filled ? '' : placeholder}
            />
          )}

          {placeholder && !filled && !autocomplete && <span css={{}}>{placeholder}</span>}
        </div>
      </FormControl>
    </div>
  );
};

TagList.displayName = 'TagList';
