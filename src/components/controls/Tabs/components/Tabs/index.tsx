import { Children, ReactElement, cloneElement } from 'react';

import { useTabsTheme } from '../../context';
import { TabProps, TabsProps } from '../../types';
import { ShowMoreButton as DefaultTooltipButton } from '../ShowMore';

const makesureStringHasPrefix = (str: string, prefix: string) => {
    if (str.startsWith(`${prefix}_`)) return str;

    return `${prefix}_${str}`;
};

export const TabsComponent = ({
    TabList,
    ShowMoreButton = DefaultTooltipButton,
    className,
    containerCSS,
    defaultMatch,
    children,
    selectedId: propsSelectedId,
    scrollable,
    collapsible,
    collapsedTabsIds,
    keepMounted = false,
    dataTestId,
    breakpoint,
    countErrors,
    onChange,
}: Omit<TabsProps, 'view'>) => {
    const { idPrefix } = useTabsTheme();

    const tabsArray = Children.toArray(children) as Array<ReactElement<TabProps>>;

    const titles = tabsArray.map(
        ({
            props: {
                title,
                id,
                rightAddons,
                leftAddons,
                disabled,
                hidden,
                toggleCSS,
                className,
                renderTitle,
                unfocusable,
            },
        }) => ({
            title,
            id: `${idPrefix}_${id}`,
            disabled,
            rightAddons,
            leftAddons,
            hidden,
            toggleCSS,
            className,
            renderTitle,
            unfocusable,
            countErrors: countErrors?.find(item => item.id === id)?.count || 0,
        })
    );

    const selectedId =
        typeof propsSelectedId === 'undefined'
            ? titles?.[0]?.id || undefined
            : makesureStringHasPrefix(`${propsSelectedId}`, idPrefix);

    const tabs = tabsArray
        .map(e => ({ ...e, id: `${idPrefix}_${e.props.id}` }))
        .filter(tab => (tab.id === selectedId || tab.props.keepMounted || keepMounted) && !tab.props.renderTitle);

    return (
        <div className={className} role="navigation">
            <TabList
                ShowMoreButton={ShowMoreButton}
                containerCSS={containerCSS}
                titles={titles}
                selectedId={selectedId}
                scrollable={scrollable}
                collapsible={collapsible}
                collapsedTabsIds={collapsedTabsIds}
                onChange={onChange}
                dataTestId={dataTestId}
                defaultMatch={defaultMatch}
                breakpoint={breakpoint}
            />

            {tabs.map(tab => cloneElement(tab, { hidden: tab.id !== selectedId }))}
        </div>
    );
};
