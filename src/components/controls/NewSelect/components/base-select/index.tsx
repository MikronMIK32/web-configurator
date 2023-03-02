import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import { UseMultipleSelectionProps, UseMultipleSelectionState, useCombobox, useMultipleSelection } from 'downshift';
import { FocusEvent, KeyboardEvent, MouseEvent, forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import Popover from '@controls/Popover';

import { useIsomorphicLayoutEffect } from '@scripts/hooks/useIsomorphicLayoutEffect';

import { SelectThemeProvider } from '../../context';
import { selectThemes } from '../../themes';
import { BaseSelectProps, OptionShape, SelectState } from '../../types';
import { processOptions } from '../../utils';

// const oldHTMLFocus = HTMLElement.prototype.focus;

// const interruptFocusMap = new WeakMap<HTMLElement, true>();
// const interruptFocus = (element: HTMLElement) => {
//   interruptFocusMap.set(element, true);
// };
// const uninterruptFocus = (element: HTMLElement) => {
//   interruptFocusMap.delete(element);
// };

// HTMLElement.prototype.focus = function onFocus(...args) {
//   let initiator = 'unknown place';
//   try {
//     throw new Error();
//   } catch (e: any) {
//     if (typeof e.stack === 'string') {
//       let isFirst = true;
//       // eslint-disable-next-line no-restricted-syntax
//       for (const line of e.stack.split('\n')) {
//         const matches = line.match(/^\s+at\s+(.*)/);
//         if (matches) {
//           if (!isFirst) {
//             // first line - current function
//             // second line - caller (what we are looking for)
//             // eslint-disable-next-line prefer-destructuring
//             initiator = matches[1];
//             break;
//           }
//           isFirst = false;
//         }
//       }
//     }
//   }

//   if (interruptFocusMap.has(this)) {
//     console.log('interrupting focus of', this, 'args=', args, 'initiator=', initiator);
//     return;
//   }

//   // your custom code
//   oldHTMLFocus.apply(this, args);
// };

export const BaseSelect = forwardRef(
  (
    {
      className,
      fieldCSS,
      options,
      autocomplete = false,
      multiple = false,
      allowUnselect = false,
      disabled = false,
      closeOnSelect = !multiple,
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      circularNavigation = false,
      defaultOpen = false,
      open: openProp,
      popoverPosition = 'bottom-start',
      preventFlip = false,
      optionsListWidth = 'content',
      name,
      id,
      selected,
      error,
      hint,
      block,
      label,
      placeholder,
      fieldProps = {},
      optionsListProps = {},
      optionProps = {},
      valueRenderer,
      onChange,
      onOpen,
      onFocus,
      onBlur,
      onScroll,
      Arrow,
      Field = () => null,
      OptionsList = () => null,
      Optgroup = () => null,
      Option = () => null,
      updatePopover,
      zIndexPopover,
      visibleOptions,
      theme: themeName = 'basic',
      variant = 'primary',
      size = 'md',
      wrap = false,
      labelView,
      hideSelectedOptions,
      showEmptyOptionsList = hideSelectedOptions,
      emitChangeOnClick,
    }: BaseSelectProps,
    ref
  ) => {
    const theme = typeof themeName === 'string' ? selectThemes[themeName] : themeName;

    const rootRef = useRef<HTMLDivElement>(null);
    const fieldRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const initiatorRef = useRef<OptionShape | null>(null);

    const itemToString = (option: OptionShape | null) => (option ? option.key : '');

    const { flatOptions, selectedOptions, unselectedOptions } = useMemo(
      () => processOptions(options, selected),
      [options, selected]
    );

    const useMultipleSelectionProps: UseMultipleSelectionProps<OptionShape> = {
      itemToString,
      onSelectedItemsChange: changes => {
        if (onChange) {
          const { selectedItems = [] } = changes;

          onChange({
            selectedMultiple: selectedItems,
            selected: selectedItems.length ? selectedItems[0] : null,
            initiator: initiatorRef.current,
            name,
          });

          initiatorRef.current = null;
        }
      },
      stateReducer: (state, actionAndChanges) => {
        const { type, changes } = actionAndChanges;

        if (!allowUnselect && type === useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace) {
          return state;
        }

        return changes as UseMultipleSelectionState<OptionShape>;
      },
    };

    if (selected !== undefined) {
      useMultipleSelectionProps.selectedItems = selectedOptions;
    }

    const { selectedItems, addSelectedItem, setSelectedItems, removeSelectedItem, getDropdownProps } =
      useMultipleSelection(useMultipleSelectionProps);

    const optionsToRender = useMemo(
      () => (hideSelectedOptions && Array.isArray(selected) ? unselectedOptions : options),
      [hideSelectedOptions, options, selected, unselectedOptions]
    );

    const flatOptionsToRender = useMemo(
      () => (hideSelectedOptions && Array.isArray(selected) ? unselectedOptions : flatOptions),
      [flatOptions, hideSelectedOptions, selected, unselectedOptions]
    );

    const defaultHighlightedIndex = selectedItems.length === 0 ? -1 : undefined;

    const {
      isOpen: open,
      getMenuProps,
      getInputProps,
      getItemProps,
      // getComboboxProps,
      getLabelProps,
      highlightedIndex,
      toggleMenu,
      openMenu,
    } = useCombobox<OptionShape>({
      id,
      isOpen: openProp,
      // circularNavigation,
      items: flatOptionsToRender,
      itemToString,
      defaultHighlightedIndex,
      onIsOpenChange: changes => {
        if (onOpen) {
          /**
           *  Вызываем обработчик асинхронно.
           *
           * Иначе при клике вне открытого селекта сначала сработает onOpen, который закроет селект,
           * А затем сработает onClick кнопки открытия\закрытия с open=false и в итоге селект откроется снова.
           */
          setTimeout(() => {
            onOpen({
              open: changes.isOpen,
              name,
            });
          }, 0);
        }
      },
      scrollIntoView(node) {
        setTimeout(() => {
          node?.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
          });
        }, 0);
      },
      stateReducer: (state, actionAndChanges) => {
        const { type, changes } = actionAndChanges;
        const { selectedItem } = changes;

        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
            if (selectedItem !== undefined) {
              initiatorRef.current = selectedItem;
            }

            if (selectedItem && !selectedItem.disabled) {
              const alreadySelected = selectedItems.includes(selectedItem);
              const allowRemove = allowUnselect || (multiple && selectedItems.length > 1);

              if (alreadySelected && allowRemove) {
                removeSelectedItem(selectedItem);
              }

              if (!alreadySelected) {
                if (multiple) {
                  addSelectedItem(selectedItem);
                } else {
                  setSelectedItems([selectedItem]);
                }
              }

              if (alreadySelected && !multiple && emitChangeOnClick) {
                setSelectedItems([selectedItem]);
              }
            }

            return {
              ...changes,
              isOpen: !closeOnSelect,
              // при closeOnSelect === false - сохраняем подсвеченный индекс
              highlightedIndex: state.isOpen && !closeOnSelect ? state.highlightedIndex : changes.highlightedIndex,
            };
          default:
            return changes;
        }
      },
    });

    const menuProps = (getMenuProps as (options: object, additional: object) => any)(
      { ref: listRef },
      { suppressRefError: true }
    );
    const inputProps = getInputProps(getDropdownProps({ ref: mergeRefs([ref, fieldRef]) }));

    const handleFieldFocus = (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => {
      if (onFocus) onFocus(event);

      if (autocomplete && !open) {
        openMenu();
      }
    };

    const handleFieldBlur = (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => {
      const isNextFocusInsideList = listRef.current?.contains(
        (event.relatedTarget || document.activeElement) as HTMLElement
      );

      if (!isNextFocusInsideList) {
        if (onBlur) onBlur(event);

        inputProps.onBlur(event);
      }
    };

    const handleFieldKeyDown = (event: KeyboardEvent<HTMLDivElement | HTMLInputElement>) => {
      inputProps.onKeyDown(event);
      if (autocomplete && !open && (event.key.length === 1 || event.key === 'Backspace')) {
        // Для автокомплита - открываем меню при начале ввода
        openMenu();
      }

      if (
        [' ', 'Enter'].includes(event.key) &&
        !autocomplete &&
        (event.target as HTMLElement).tagName !== 'INPUT' &&
        (event.target as HTMLElement).tagName !== 'BUTTON'
      ) {
        // Открываем\закрываем меню по нажатию enter или пробела
        event.preventDefault();
        if (!open || highlightedIndex === -1) toggleMenu();
      }
    };

    const handleFieldClick = (event: MouseEvent) => {
      if (autocomplete && (event.target as HTMLElement).tagName.toUpperCase() === 'INPUT') {
        openMenu();
      } else {
        toggleMenu();
      }
    };

    const getOptionProps = useCallback(
      (option: OptionShape, index: number) => ({
        ...(optionProps as object),
        innerProps: getItemProps({
          index,
          item: option,
          disabled: option.disabled,
          onMouseDown: (event: MouseEvent) => event.preventDefault(),
        }),
        multiple,
        index,
        option,
        disabled: option.disabled,
        highlighted: index === highlightedIndex,
        selected: selectedItems.includes(option),
        isMobile: false,
        css: {
          // TODO: optionCSS from props
        },
      }),
      [getItemProps, highlightedIndex, multiple, optionProps, selectedItems]
    );

    useEffect(() => {
      if (defaultOpen) openMenu();
    }, [defaultOpen, openMenu]);

    useEffect(() => {
      if (openProp) {
        openMenu();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const calcOptionsListWidth = useCallback(() => {
      if (listRef.current) {
        const widthAttr = optionsListWidth === 'field' ? 'width' : 'minWidth';

        const optionsListMinWidth = rootRef.current ? rootRef.current.getBoundingClientRect().width : 0;

        listRef.current.setAttribute('style', '');
        listRef.current.style[widthAttr] = `${optionsListMinWidth}px`;
      }
    }, [optionsListWidth]);

    useEffect(() => {
      const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
      const observer = new ResizeObserver(calcOptionsListWidth);
      if (rootRef.current) {
        observer.observe(rootRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }, [calcOptionsListWidth, open, optionsListWidth]);

    useIsomorphicLayoutEffect(calcOptionsListWidth, [open, optionsListWidth, options, selectedItems]);

    const renderValue = useCallback(
      () => selectedItems.map(option => <input type="hidden" name={name} value={option.key} key={option.key} />),
      [selectedItems, name]
    );

    const needRenderOptionsList = flatOptionsToRender.length > 0 || showEmptyOptionsList;

    const hasSelected = !!selectedItems.length;
    const state = useMemo<SelectState>(
      () => ({
        isOpen: open,
        hasSelected,
        isSearch: false,
        disabled,
      }),
      [disabled, hasSelected, open]
    );

    const stupidThingThatGainsFocusRef = useRef<HTMLElement>(null);

    // // TODO: improve logic to allow focus from parent component.
    // // probable need to keep track of number of destroys OR
    // useEffect(() => {
    //   const { current } = stupidThingThatGainsFocusRef;
    //   if (current) {
    //     interruptFocus(current);
    //   }

    //   return () => {
    //     if (current) uninterruptFocus(current);

    //     // setTimeout(() => {
    //     //   stupidThingThatGainsFocusRef.current?.blur();
    //     // }, 1);

    //     if (stupidThingThatGainsFocusRef.current) {
    //       // stupidThingThatGainsFocusRef.current.blur();
    //       interruptFocus(stupidThingThatGainsFocusRef.current);
    //     }
    //   };
    // }, []);

    return (
      <SelectThemeProvider size={size} theme={theme} variant={variant} state={state}>
        <div
          css={{
            maxWidth: '100%',
            position: 'relative',
            outline: 0,
            ...(block && { width: '100%' }),
          }}
          className={className}
          // {...getComboboxProps({
          //   ref: rootRef,
          //   ...(disabled && { 'aria-disabled': true }),
          //   className,
          // })}
          {...(disabled && { 'aria-disabled': true })}
          ref={rootRef}
          onKeyDown={disabled ? undefined : handleFieldKeyDown}
          tabIndex={-1}
        >
          <Field
            name={name}
            selectedMultiple={selectedItems}
            selected={selectedItems[0]}
            setSelectedItems={setSelectedItems}
            toggleMenu={toggleMenu}
            multiple={multiple}
            open={open}
            disabled={disabled}
            size={size}
            wrap={wrap}
            autocomplete={autocomplete}
            placeholder={placeholder}
            label={label}
            labelView={labelView}
            labelProps={getLabelProps()}
            Arrow={Arrow && <Arrow disabled={disabled} />}
            error={error}
            hint={hint}
            valueRenderer={valueRenderer}
            css={fieldCSS}
            innerProps={{
              onBlur: handleFieldBlur,
              onFocus: disabled ? undefined : handleFieldFocus,
              onClick: disabled ? undefined : handleFieldClick,
              tabIndex: disabled ? -1 : 0,
              ref: mergeRefs([stupidThingThatGainsFocusRef, inputProps.ref]),
              id: inputProps.id,
              'aria-labelledby': inputProps['aria-labelledby'],
              'aria-controls': inputProps['aria-controls'],
              'aria-autocomplete': autocomplete ? inputProps['aria-autocomplete'] : undefined,
            }}
            {...fieldProps}
          />

          {name && renderValue()}

          <Popover
            open={open}
            anchorElement={fieldRef.current as HTMLElement}
            position={popoverPosition}
            preventFlip={preventFlip}
            popperCSS={{
              boxShadow: 'none',
              border: 'none',
              borderRadius: 0,
              position: 'relative',
            }}
            update={updatePopover}
            zIndex={zIndexPopover}
          >
            {needRenderOptionsList && (
              <div {...menuProps}>
                <OptionsList
                  {...optionsListProps}
                  optionsListWidth={optionsListWidth}
                  flatOptions={flatOptionsToRender}
                  highlightedIndex={highlightedIndex}
                  open={open}
                  size={size}
                  options={optionsToRender}
                  Optgroup={Optgroup}
                  Option={Option}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  toggleMenu={toggleMenu}
                  getOptionProps={getOptionProps}
                  visibleOptions={visibleOptions}
                  onScroll={onScroll}
                />
              </div>
            )}
          </Popover>
        </div>
      </SelectThemeProvider>
    );
  }
);

BaseSelect.displayName = 'BaseSelect';
