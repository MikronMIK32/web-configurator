import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { useForm, useFormContext, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { DetailsTrigger } from '@components/DetailsTrigger';
import { FormSticky } from '@components/FormSticky';
import { PeripheryWrapper } from '@components/PeripheryWrapper';
import FormUnsavedPrompt from '@components/UnsavedPrompt';
import Checkbox from '@components/controls/Checkbox';
import Form from '@components/controls/Form';
import Tabs from '@components/controls/Tabs';

import { RootState } from '@store/index';
import {
  VccMonitorState as State,
  vccMonitorInitialState as initialState,
  vccMonitorStateSchema as schema,
  setVccMonitor as setSlice,
} from '@store/system/vcc-monitor';

import { scale } from '@scripts/helpers';

const SHORT_NAME = 'VCC Monitor';
const FULL_NAME = 'Монитор питания';
const SETTINGS_OF = 'монитора питания';

const useData = () => useSelector<RootState, State>(state => state.system.pdp);

const Settings = () => {
  const [enabled] = useWatch({
    name: ['enabled'],
  });

  if (!enabled) return null;

  return <FormUnsavedPrompt />;
};

const CommonSettings = () => (
  <div
    css={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: scale(1),
    }}
  >
    <Form.Field name="enabled">
      <Checkbox>Включить {FULL_NAME}</Checkbox>
    </Form.Field>
    <DetailsTrigger title={SHORT_NAME} description={`Информация об ${FULL_NAME}`} />
  </div>
);

const TheForm = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const data = useData();
  const form = useForm<State>({
    defaultValues: data,
    mode: 'all',
    resolver: zodResolver(schema),
  });

  return (
    <div
      css={{
        minHeight: '100%',
        display: 'grid',
      }}
    >
      <Form
        methods={form}
        onSubmit={vals => {
          dispatch(setSlice(vals));
          form.reset(vals);
        }}
        onReset={() => {
          dispatch(setSlice(form.getValues()));
          form.reset();
        }}
        css={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {children}
      </Form>
    </div>
  );
};

const Inner = () => {
  const formContext = useFormContext();
  const data = useData();

  const dispatch = useDispatch();
  return (
    <FormSticky
      onDefaultReset={() => {
        dispatch(setSlice(initialState));
        formContext.reset(initialState);
      }}
      onReset={() => {
        formContext.reset(data);
      }}
      css={{
        justifyContent: 'end',
        marginBottom: -scale(2),
        marginLeft: -scale(2),
        marginRight: -scale(2),
      }}
    />
  );
};

const Periphery = () => (
  <TheForm>
    <PeripheryWrapper title={`Настройки ${SETTINGS_OF}`} css={{ marginBottom: scale(4) }}>
      <CommonSettings />
      <Tabs css={{ marginTop: scale(2) }} keepMounted>
        <Tabs.Tab title="Настройки" id="0">
          <Settings />
        </Tabs.Tab>
        <Tabs.Tab title="Прерывания" id="1">
          Interrupts
        </Tabs.Tab>
      </Tabs>
    </PeripheryWrapper>
    <Inner />
  </TheForm>
);

export default Periphery;
