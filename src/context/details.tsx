import {
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

export interface DetailsData {
    id: string;
    title: string;
    description: string;
    render?: () => ReactNode;
}

export interface DetailsContextProps {
    enabled: boolean;
    setEnabled: Dispatch<SetStateAction<boolean>>;
    currentData: DetailsData | null;
    setCurrentData: Dispatch<SetStateAction<DetailsData | null>>;
}

const DetailsContext = createContext<DetailsContextProps | null>(null);
DetailsContext.displayName = 'DetailsContext';

export const DetailsProvider: FC<{
    children: ReactNode | ReactNode[];
    initialData?: DetailsContextProps['currentData'];
}> = ({ children, initialData = null }) => {
    const [currentData, setCurrentData] = useState<DetailsData | null>(initialData);
    const [enabled, setEnabled] = useState(true);

    useEffect(() => {
        setCurrentData(initialData);
    }, [initialData]);

    const value = useMemo(
        () => ({
            enabled,
            setEnabled,
            currentData,
            setCurrentData,
        }),
        [currentData, enabled]
    );

    return <DetailsContext.Provider value={value}>{children}</DetailsContext.Provider>;
};

export const useDetails = () => {
    const context = useContext(DetailsContext);

    useEffect(() => {
        const listener = (evt: KeyboardEvent) => {
            if (document.activeElement) {
                if (document.activeElement.nodeName.toLocaleLowerCase() !== 'body') {
                    return;
                }
            }
            let isEscape = false;
            if ('key' in evt) {
                isEscape = evt.key === 'Escape' || evt.key === 'Esc';
            } else if ('keyCode' in evt) {
                isEscape = (evt as any).keyCode === 27;
            }
            if (isEscape) {
                context?.setCurrentData(null);
            }
        };

        window.addEventListener('keyup', listener);

        return () => {
            window.removeEventListener('keyup', listener);
        };
    }, [context]);

    if (!context) {
        throw new Error(`Hook useDetails must be used within HeaderProvider`);
    }

    return context;
};
