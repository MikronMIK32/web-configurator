/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useEffect, useState } from 'react';

import TicketIcon from '@icons/small/card.svg';

import Tabs from '.';
import README from './README.md';

export default {
    title: 'Components / future / Tabs',
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    component: Tabs,
} as Meta<typeof Tabs>;

export const Basic: StoryObj<ComponentProps<typeof Tabs> & {}> = {
    args: {
        fullWidthScroll: false,
        scrollable: false,
        collapsible: false,
        theme: 'basic',
    },
    argTypes: {
        theme: {
            options: ['basic', 'secondary'],
            control: { type: 'radio' },
        },
    },
    render: args => {
        const [isLoading, setLoading] = useState(true);
        const [isLoadingRerender, setLoadingRerender] = useState(true);

        useEffect(() => {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
            setTimeout(() => {
                setLoadingRerender(false);
            }, 1000);
        }, []);

        return (
            <Tabs {...args}>
                <Tabs.Tab title="First tab" id="1" leftAddons={<TicketIcon />}>
                    Content of first tab
                </Tabs.Tab>
                <Tabs.Tab title="2nd disabled" disabled id="2">
                    <div>You cant reach me</div>
                </Tabs.Tab>
                <Tabs.Tab
                    title="Link has focus"
                    id="link1"
                    renderTitle={props => <Tabs.LinkTitle href="https://google.com" target="_blank" {...props} />}
                    leftAddons={<TicketIcon />}
                    rightAddons={<span>[SALE!]</span>}
                >
                    <div />
                </Tabs.Tab>
                <Tabs.Tab title="Third tab" id="3" rightAddons={<span>99+</span>}>
                    <div>Its a third tab</div>
                </Tabs.Tab>
                {!isLoadingRerender ? (
                    [1, 2, 3].map(e => (
                        <Tabs.Tab
                            key={e + 3}
                            title={isLoading ? `Loading tab#${e + 3}` : `Appeared #${e + 3}`}
                            id={e + 3}
                            disabled={isLoading}
                        >
                            <div>Its a dynamic tab #{e + 3}</div>
                        </Tabs.Tab>
                    ))
                ) : (
                    <></>
                )}
                {[4, 5, 6, 7, 8, 9, 10].map(e => (
                    <Tabs.Tab
                        key={e + 3}
                        title={isLoading ? `Loading tab#${e + 3}` : `Dynamic tab#${e + 3}`}
                        id={e + 3}
                        disabled={isLoading}
                    >
                        <div>Its a dynamic tab #{e + 3}</div>
                    </Tabs.Tab>
                ))}
                <Tabs.Tab
                    title="I am a last link"
                    id="link2"
                    renderTitle={props => <Tabs.LinkTitle href="https://ya.ru" target="_blank" {...props} />}
                    unfocusable
                >
                    <div />
                </Tabs.Tab>
            </Tabs>
        );
    },
};
