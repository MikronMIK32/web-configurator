import { MutableRefObject, RefObject, useCallback, useEffect, useRef, useState } from 'react';

type KeyboardFocusableProps = {
    /**
     * Рендер-проп, в который передается состояние фокуса и реф.
     *
     * Реф нужно установить на интерактивный элемент или на одного из его родителей.
     */
    // eslint-disable-next-line no-undef
    children: (ref: RefObject<any>, focused: boolean) => JSX.Element;
};

export type InputMethod = 'keyboard' | 'mouse';

let prevInputMethod: InputMethod;

function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
        prevInputMethod = 'keyboard';
    }
}

function handleMouseDown() {
    prevInputMethod = 'mouse';
}

function handleTouchStart() {
    prevInputMethod = 'mouse';
}

/**
 * Навешивает несколько глобальных обработчиков и отслеживает метод ввода - мышь или клавиатура.
 * Note: Повторный вызов функции не дублирует обработчики
 */
function addGlobalListeners() {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('touchstart', handleTouchStart);
}

/**
 * Хук устанавливает обработчик события на focusin и focusout
 * по конкретному типу события
 * @param node Элемент на котором установится обработчик (default = document)
 * @param inputMethod Если параметр не задан, установит обработчик по любому событию фокуса
 */
export function useFocus<T extends HTMLElement>(
    ref: MutableRefObject<T> | RefObject<T>,
    inputMethod?: InputMethod
): [boolean] {
    const [focus, setFocus] = useState(false);

    const handleFocus = useCallback(() => {
        if (!inputMethod || inputMethod === prevInputMethod) {
            setFocus(true);
        }
    }, [inputMethod]);

    const handleBlur = useCallback(() => {
        setFocus(false);
    }, []);

    useEffect(() => {
        const node = ref.current;

        if (node) {
            node.addEventListener('focusin', handleFocus);
            node.addEventListener('focusout', handleBlur);
        }

        return () => {
            if (node) {
                node.removeEventListener('focusin', handleFocus);
                node.removeEventListener('focusout', handleBlur);
            }
        };
    }, [handleBlur, handleFocus, ref]);

    useEffect(addGlobalListeners, []);

    return [focus];
}

export const KeyboardFocusable = ({ children }: KeyboardFocusableProps) => {
    const targetRef = useRef<HTMLElement | null>(null);

    const [focused] = useFocus(targetRef, 'keyboard');

    return children(targetRef, focused);
};

KeyboardFocusable.displayName = 'KeyboardFocusable';
