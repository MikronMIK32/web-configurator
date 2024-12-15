import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useMemo } from 'react';
import { useForm, useFormContext, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { DetailsTrigger } from '@components/DetailsTrigger';
import { FormSticky } from '@components/FormSticky';
import { PeripheryWrapper } from '@components/PeripheryWrapper';
import FormUnsavedPrompt from '@components/UnsavedPrompt';
import Checkbox from '@components/controls/Checkbox';
import Form from '@components/controls/Form';
import IntegerMaskedInput from '@components/controls/IntegerMaskedInput';
import Select from '@components/controls/NewSelect';
import Tabs from '@components/controls/Tabs';

import { RootState } from '@store/index';
import {
  CLOCK_EDGE_OPTIONS,
  FEEDBACK_CLOCK_OPTIONS,
  INTERFACE_MODE_OPTIONS,
  SPIFI_INTERFACE_OPTIONS,
  SpifiState as State,
  spifiInitialState as initialState,
  spifiStateSchema as schema,
  setSpifi as setSlice,
} from '@store/project/interface/spifi';
import { PCCClockSource, pccClockSourceFreq } from '@store/project/system/pcc';

import { formatNumber, scale } from '@scripts/helpers';

const SHORT_NAME = 'SPIFI';
const FULL_NAME = 'SPIFI';
const SETTINGS_OF = 'SPIFI';

const useData = () => useSelector<RootState, State>(state => state.project.interface.spifi);

const Settings = () => {
  const [enabled, divider] = useWatch({
    name: ['enabled', 'divider'],
  });
  const systemSource = useSelector<RootState>(state => state.project.system.pcc.systemSource) as PCCClockSource;
  const fSystem = pccClockSourceFreq[systemSource];
  const divAhb = useSelector<RootState>(state => state.project.system.pcc.ahb) as number;

  const fHclk = useMemo(() => fSystem / (1 + divAhb), [fSystem, divAhb]);
  const spifiClk = useMemo(() => fHclk / ((divider ?? 0) + 1), [fHclk, divider]);

  if (!enabled) return null;

  return (
    <>
      <Form.Field
        name="divider"
        label="Делитель"
        hint="Число от 0 до 7"
        css={{ marginBottom: scale(2), marginTop: scale(2) }}
      >
        <IntegerMaskedInput />
      </Form.Field>
      {typeof divider === 'number' && (
        <p css={{ marginBottom: scale(2) }}>Частота SPIFI составит - {formatNumber(Math.floor(spifiClk))} Гц</p>
      )}
      <Form.Field name="interface" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <div css={{ display: 'flex', gap: scale(1) }}>
              <span>Интерфейс</span>
              <DetailsTrigger title="Интерфейс" description="Информация. TODO" />
            </div>
          }
          options={SPIFI_INTERFACE_OPTIONS}
        />
      </Form.Field>
      <Form.Field name="mode" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <div css={{ display: 'flex', gap: scale(1) }}>
              <span>Режим интерфейса</span>
              <DetailsTrigger title="Режим интерфейса" description="Информация. TODO" />
            </div>
          }
          options={INTERFACE_MODE_OPTIONS}
        />
      </Form.Field>
      <Form.Field name="clockEdge" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <div css={{ display: 'flex', gap: scale(1) }}>
              <span>Фронт тактового сигнала для выборки входных данных</span>
              <DetailsTrigger
                title="Фронт тактового сигнала для выборки входных данных"
                description="Информация. TODO"
              />
            </div>
          }
          options={CLOCK_EDGE_OPTIONS}
        />
      </Form.Field>
      <Form.Field name="feedbackClock" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <div css={{ display: 'flex', gap: scale(1) }}>
              <span>Сигнал выборки входных данных</span>
              <DetailsTrigger title="Сигнал выборки входных данных" description="Информация. TODO" />
            </div>
          }
          options={FEEDBACK_CLOCK_OPTIONS}
        />
      </Form.Field>
      <Form.Field
        name="timeout"
        label="Количество периодов сигнала SCK без чтения данных до завершения команды"
        css={{ marginBottom: scale(2) }}
      >
        <IntegerMaskedInput />
      </Form.Field>
      <Form.Field
        name="csDelay"
        label="Количество периодов сигнала SCK до активации сигнала CS перед выполнением команды"
        css={{ marginBottom: scale(2) }}
      >
        <IntegerMaskedInput />
      </Form.Field>
      <Form.Field name="interruptEnable" css={{ marginBottom: scale(2) }}>
        <Checkbox>Запросы прерывания</Checkbox>
      </Form.Field>
      <Form.Field name="dmaEnable" css={{ marginBottom: scale(2) }}>
        <Checkbox>Запросы DMA</Checkbox>
      </Form.Field>
      <Form.Field name="cacheEnable" css={{ marginBottom: scale(2) }}>
        <Checkbox>Кэширование</Checkbox>
      </Form.Field>
      <Form.Field name="dataCacheEnable" css={{ marginBottom: scale(2) }}>
        <Checkbox>Кэширование данных</Checkbox>
      </Form.Field>
      <Form.Field name="prefetchEnable" css={{ marginBottom: scale(2) }}>
        <Checkbox>Упреждающие выборки</Checkbox>
      </Form.Field>
      <Form.Field name="cacheLimit" label="Верхний предел кэшируемой памяти">
        <IntegerMaskedInput />
      </Form.Field>
      <FormUnsavedPrompt />
    </>
  );
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
