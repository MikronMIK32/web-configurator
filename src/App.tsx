import ErrorBoundaryAlert from 'antd/lib/alert/ErrorBoundary';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSelector } from 'react-redux';

import Periphery from '@views/Periphery';

import GlobalStyles from '@components/GlobalStyles';
import Tabs from '@components/controls/Tabs';

import { ReactComponent as ClockIcon } from '@icons/large/clock.svg';
import { ReactComponent as GraphIcon } from '@icons/large/graph.svg';

import { RootState } from './store';

// https://redux.js.org/usage/configuring-your-store

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ErrorFallback = ({ error, resetErrorBoundary }: any) => (
    <ErrorBoundaryAlert message={error.message} description="Oops something went wrong" />
    // <div role="alert">
    //     <p>Something went wrong:</p>
    //     <pre>{error.message}</pre>
    //     <button onClick={resetErrorBoundary} type="button">
    //         Try again
    //     </button>
    // </div>
);

function App() {
    const [tab, setTab] = useState(0);

    const rootState = useSelector<RootState>(state => state);

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                // TODO: save/revert state
                window.location.reload();
            }}
        >
            <GlobalStyles />
            <Tabs
                selectedIndex={tab}
                onSelect={index => setTab(index)}
                css={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                panelCSS={{ paddingTop: 0 }}
                panelFillsHeight
            >
                <Tabs.List horizontalScroll>
                    <Tabs.Tab Icon={GraphIcon}>Периферия</Tabs.Tab>
                    <Tabs.Tab Icon={ClockIcon}>Clock</Tabs.Tab>
                    <Tabs.Tab>[Dev]</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel>
                    <Periphery />
                </Tabs.Panel>
                <Tabs.Panel>Clock TODO</Tabs.Panel>
                <Tabs.Panel>
                    <div css={{ position: 'relative' }}>
                        <pre
                            css={{
                                display: 'inline-block',
                            }}
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify(rootState, undefined, 2),
                            }}
                        />
                    </div>
                </Tabs.Panel>
            </Tabs>
        </ErrorBoundary>
    );
}

export default App;
