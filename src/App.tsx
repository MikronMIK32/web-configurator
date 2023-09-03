import ErrorBoundaryAlert from 'antd/lib/alert/ErrorBoundary';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSelector } from 'react-redux';

import ExportView from '@views/Export';
import PeripheriesView from '@views/PeripheriesView';

import GlobalStyles from '@components/GlobalStyles';
import Tabs from '@components/controls/Tabs';

// import { ReactComponent as ClockIcon } from '@icons/large/clock.svg';
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
  const [tab, setTab] = useState('peripheral');

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
        selectedId={tab}
        onChange={(_, { selectedId }) => {
          setTab(selectedId);
        }}
        css={{
          height: 'calc(100% - 48px)',
        }}
        keepMounted
      >
        <Tabs.Tab
          id="peripheral"
          title="Перифирия"
          rightAddons={<GraphIcon />}
          css={{
            height: '100%',
          }}
        >
          <PeripheriesView />
        </Tabs.Tab>
        {/* <Tabs.Tab title="Clock" rightAddons={<ClockIcon />}>
          TODO
        </Tabs.Tab> */}
        <Tabs.Tab id="debug" title="Отладочная структура проекта">
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
        </Tabs.Tab>
        <Tabs.Tab id="export" title="Экспорт">
          <ExportView />
        </Tabs.Tab>
      </Tabs>
    </ErrorBoundary>
  );
}

export default App;
