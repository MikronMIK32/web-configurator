import { Component, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ExportView from '@views/Export';
import Pcc from '@views/Pcc';
import PeripheriesView from '@views/PeripheriesView';

import GlobalStyles from '@components/GlobalStyles';
import Tabs from '@components/controls/Tabs';

import GraphIcon from '@icons/large/graph.svg?react';

import { RootState } from './store';

function deepstringify(obj: any) {
  const seen: Record<any, any> = {}; // keep track of already processed objects

  const recurse = (value: any): any => {
    let result;

    // eslint-disable-next-line default-case
    switch (typeof value) {
      case 'object':
        if (Array.isArray(value)) {
          result = `[${value.map(recurse).join(', ')}]`;
        } else if (value instanceof Map || value instanceof Set) {
          const keys = [...value.keys()];
          const values = [...value.values()];
          result = `{ ${keys.map((k, i) => `${recurse(k)}: ${recurse(values[i])}`).join(', ')} }`;
        } else if (value instanceof Date) {
          result = `"${value.toISOString()}"`;
        } else if (value instanceof RegExp) {
          result = `/${value.source}/g`;
        } else if (value instanceof Error) {
          result = `error: "${value.message}"\nstack trace:\n${value.stack}`;
        } else if (value in seen) {
          result = `circular reference to ${seen[value]}`;
        } else {
          result = JSON.stringify(value);
        }

        seen[value] = true;

        return result;
    }

    return `${value}`;
  };

  return recurse(obj);
}

class ErrorBoundary extends Component<any, { error: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(err: any) {
    // Update state so the next render will show the error.
    return { error: err };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container">
          <style>
            {`
            html,body { padding: 0; margin: 0; }
            h1 { margin: 0; margin-bottom: 16px; }
            .container { max-width: 1200px; margin: 0 auto; text-align: center; margin-top: 64px; }
            pre { text-align: left; }
          `}
          </style>
          <h1>Что-то сломалось:</h1>
          <pre>{deepstringify(this.state.error)}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [tab, setTab] = useState('peripheral');

  useEffect(() => {
    setTab('peripheral');
  }, []);

  const rootState = useSelector<RootState>(state => state);

  return (
    <ErrorBoundary>
      <GlobalStyles />
      <Tabs
        selectedId={tab}
        onChange={(_, { selectedId }) => {
          setTab(selectedId);
        }}
        containerCSS={{
          flexShrink: 0,
        }}
        css={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Tabs.Tab
          id="peripheral"
          title="Периферия"
          rightAddons={<GraphIcon />}
          css={{
            height: '100%',
          }}
        >
          <PeripheriesView />
        </Tabs.Tab>
        <Tabs.Tab
          id="pcc"
          title="Pcc"
          css={{
            height: 'calc(100vh - 48px)',
          }}
        >
          <Pcc />
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
