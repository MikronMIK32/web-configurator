import { RootState } from '@store/index';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ExportView from '@views/project/Export';

import Close from '@icons/small/close.svg?react';
import Pcc from '@views/project/Pcc';

import Tabs from '@components/controls/Tabs';

import GraphIcon from '@icons/large/graph.svg?react';
import PeripheriesView from './PeripheriesView';
import { NavLink, useParams } from 'react-router-dom';
import { TabList } from '@components/controls/Tabs/components/TabList';
import Button from '@components/controls/Button';

export default function ProjectView() {
  const { id } = useParams(); // Accesses the dynamic segment from the URL

  const [tab, setTab] = useState('peripheral');

  useEffect(() => {
    setTab('peripheral');
  }, []);

  const rootState = useSelector<RootState>(state => state);

  return (
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
      TabList={props => {
        return (
          <TabList {...props}>
            <Button
              as={NavLink}
              to={'/'}
              size="sm"
              css={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                alignSelf: 'center',
                marginLeft: 'auto',
                fontWeight: '500!important',
              }}
              Icon={Close}
              variant="secondary"
            >
              Закрыть проект
            </Button>
          </TabList>
        );
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
        <PeripheriesView id={id!} />
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
  );
}
