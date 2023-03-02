import { Children, ReactNode, cloneElement, isValidElement, useCallback, useEffect, useRef, useState } from 'react';

import { scale } from '@scripts/helpers';

import Tag from './Tag';

export interface TagsProps {
  className?: string;
  disabled?: boolean;
  wrap?: boolean;
  children: ReactNode[];
  onDelete: (index: number) => void;
}

export interface TagsCompositionProps {
  Tag: typeof Tag;
}

const Tags = ({ className, disabled, wrap, children, onDelete }: TagsProps & Partial<TagsCompositionProps>) => {
  const itemsRef = useRef<{ [key: number]: HTMLButtonElement }>({});
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(-1);

  const itemsCount = Children.count(children);

  const isValidIndex = (idx: number) => idx >= 0 && idx <= itemsCount - 1;

  const getPropsForIth = (index: number) => ({
    tabIndex: -1,
    disabled,
    onDelete: () => {
      onDelete(index);

      const left = activeIndex - 1;
      const right = activeIndex + 1;

      if (isValidIndex(left)) {
        itemsRef.current[left]?.focus();
        setActiveIndex(left);
      } else if (isValidIndex(right)) {
        itemsRef.current[right]?.focus();
        setActiveIndex(right);
      } else {
        setActiveIndex(-1);
      }
    },
    ref: (element: HTMLButtonElement) => {
      itemsRef.current[index] = element;
    },
    onBlur: () => {
      setTimeout(() => {
        const flatItems = Object.values(itemsRef.current);

        if (!flatItems.includes(document.activeElement as any)) {
          setActiveIndex(-1);
        }
      }, 0);
    },
  });

  const onKeyPress = useCallback(
    (event: KeyboardEvent) => {
      setActiveIndex(oldValue => {
        if (!itemsCount) return -1;

        let value = oldValue;

        if (event.key === 'ArrowRight') {
          value += 1;
        } else if (event.key === 'ArrowLeft') {
          value -= 1;
        } else if (
          event.key === 'ArrowDown' ||
          event.key === 'ArrowUp' ||
          event.code === 'Enter' ||
          event.code === 'Space'
        ) {
          event.stopPropagation();
        }

        if (value < 0) {
          value = 0;
        }

        if (value > itemsCount - 1) {
          value = itemsCount - 1;
        }

        itemsRef.current[value]?.focus();

        return value;
      });
    },
    [itemsCount]
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    wrapper.addEventListener('keydown', onKeyPress);
    return () => {
      wrapper.removeEventListener('keydown', onKeyPress);
    };
  }, [onKeyPress]);

  return (
    <div
      css={{
        ...(!wrap && {
          ':after': {
            background: 'linear-gradient(90deg, transparent 20%, rgb(247 249 251) 90%)',
            content: '""',
            width: 30,
            height: '100%',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
          },
        }),
      }}
    >
      {itemsCount > 0 ? (
        <div
          className={className}
          css={{
            display: 'flex',
            flexWrap: wrap ? 'wrap' : 'nowrap',
            flexDirection: 'row',
            gap: `${scale(1)}px ${scale(1, true)}px`,
          }}
          tabIndex={disabled || !itemsCount || activeIndex === 0 ? -1 : 0}
          ref={wrapperRef}
        >
          {Children.map(children, (child, index) => {
            if (!isValidElement(child)) {
              console.error('Tags require Tag elements to be its children');
              return;
            }

            return cloneElement<any>(child, {
              ...getPropsForIth(index),
              ...child.props,
            });
          })}
        </div>
      ) : null}
    </div>
  );
};

Tags.Tag = Tag;

export default Tags;
