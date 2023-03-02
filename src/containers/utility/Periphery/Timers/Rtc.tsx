import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, lazy, useCallback, useMemo } from 'react';
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { DetailsTrigger } from '@components/DetailsTrigger';
import { FormSticky } from '@components/FormSticky';
import PageAccordion from '@components/PageAccordion';
import { PeripheryWrapper } from '@components/PeripheryWrapper';
import SpinnerSuspense from '@components/SpinnerSuspense';
import FormUnsavedPrompt from '@components/UnsavedPrompt';
import Checkbox from '@components/controls/Checkbox';
import CronDateForm from '@components/controls/CronDateForm';
import DateForm from '@components/controls/DateTimeForm';
import Form from '@components/controls/Form';
import FormControl from '@components/controls/FormControl';
import Select from '@components/controls/NewSelect';
import Tabs from '@components/controls/Tabs';

import { RootState } from '@store/index';
import { RtcSourceType, RtcState, rtcInitialState, rtcRegisterSchema, rtcStateSchema, setRtc } from '@store/timers/rtc';

import { scale } from '@scripts/helpers';

const ByteTable = lazy(() => import('@components/ByteTable'));

const ByteTableLabel = () => (
  <>
    Таблица регистров
    <DetailsTrigger
      title="Регистры RTC"
      description="Регистры RTC представляют собой 4 байтные значения, записываемые в регистры R0-R15."
    />
  </>
);

const byteTableLabelCSS = {
  display: 'flex',
  width: 'fit-content',
  gap: scale(1),
  alignItems: 'center',
};

const RegisterByteTable = () => {
  const form = useFormContext();
  const { control } = form;

  const label = useMemo(() => <ByteTableLabel />, []);

  const renderControlledByteTable = useCallback(
    ({ fieldState, field }: { field: ControllerRenderProps<any, any>; fieldState: ControllerFieldState }) => (
      <FormControl block labelCSS={byteTableLabelCSS} label={label} error={JSON.stringify(fieldState.error)}>
        <ByteTable {...field} defaultValue={rtcInitialState.rtcRegisters} validationSchema={rtcRegisterSchema} />
      </FormControl>
    ),
    [label]
  );

  return <Controller name="rtcRegisters" control={control} render={renderControlledByteTable} />;
};

const RtcSettings = () => {
  const [rtcEnabled, alarmEnabled] = useWatch({
    name: ['rtcEnabled', 'alarmEnabled'],
  });

  // TODO: preloader when will be on backend API
  // const rehydrated = useSelector<RootState, boolean>(
  //   // eslint-disable-next-line no-underscore-dangle
  //   (state) => state._persist.rehydrated,
  // );

  return (
    <>
      {rtcEnabled && (
        <Form.Field name="rtcSource">
          <Select
            label="Тактирование от"
            options={[
              {
                key: 'Внешний осциллятор OSC32K',
                value: RtcSourceType.External,
              },
              {
                key: 'Внутренний осциллятор LSI32K',
                value: RtcSourceType.Internal,
              },
            ]}
          />
        </Form.Field>
      )}
      <PageAccordion css={{ marginTop: scale(2), marginBottom: scale(12) }}>
        {rtcEnabled && (
          <>
            <PageAccordion.Item uuid="rtcDateTime" title="Дата и время RTC">
              <DetailsTrigger
                title="Дата RTC"
                description="Вы можете задавать дату для срабатывания прерывания. Срабатывает один раз."
              />
              <DateForm name="rtcDateTime" />
            </PageAccordion.Item>
            <PageAccordion.Item uuid="rtcRegisters" title="Регистры RTC">
              <SpinnerSuspense>
                <RegisterByteTable />
              </SpinnerSuspense>
            </PageAccordion.Item>
          </>
        )}
        {rtcEnabled && alarmEnabled && (
          <PageAccordion.Item uuid="alarmDateTime" title="Дата и время будильника">
            <DetailsTrigger
              title="Дата и время будильника"
              description="Вы можете задавать поля: век, год, месяц, день недели, день, часы, минуты и секунды. Сравнение происходит независимо по каждому из полей."
            />
            <CronDateForm name="alarmDateTime" />
          </PageAccordion.Item>
        )}
      </PageAccordion>

      <FormUnsavedPrompt />
    </>
  );
};

const CommonSettings = () => {
  const form = useFormContext();

  const rtcEnabled = form.watch('rtcEnabled');

  return (
    <>
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: scale(1),
        }}
      >
        <Form.Field name="rtcEnabled">
          <Checkbox>Включить RTC</Checkbox>
        </Form.Field>
        <DetailsTrigger title="RTC" description="Информация об RTC" />
      </div>
      {rtcEnabled && (
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: scale(1),
          }}
        >
          <Form.Field name="alarmEnabled">
            <Checkbox>Включить будильник</Checkbox>
          </Form.Field>
          <DetailsTrigger title="Будильник" description="Информация о будильнике. Также можно выделять в группы)" />
        </div>
      )}
    </>
  );
};

const RtcForm = ({ children }: { children: ReactNode }) => {
  const store = useStore<RootState>();
  const dispatch = useDispatch();
  const rtc = useSelector<RootState, RtcState>(state => state.timers.rtc);
  const form = useForm<RtcState>({
    defaultValues: rtc,
    mode: 'all',
    resolver: zodResolver(rtcStateSchema),
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
          dispatch(setRtc(vals));
          const newVals = store.getState().timers.rtc;
          form.reset(newVals);
        }}
        onReset={() => {
          dispatch(setRtc(form.getValues()));
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

const RtcInner = () => {
  const formContext = useFormContext();
  const rtc = useSelector<RootState, RtcState>(state => state.timers.rtc);

  const dispatch = useDispatch();
  return (
    <FormSticky
      onDefaultReset={() => {
        dispatch(setRtc(rtcInitialState));
        formContext.reset(rtcInitialState);
      }}
      onReset={() => {
        formContext.reset(rtc);
      }}
      css={{
        padding: scale(2),
        justifyContent: 'end',
      }}
    />
  );
};

const Rtc = () => (
  <RtcForm>
    <PeripheryWrapper title="Настройки RTC">
      <CommonSettings />
      <Tabs css={{ marginTop: scale(2) }} forceRenderTabPanel>
        <Tabs.List>
          <Tabs.Tab>Настройки</Tabs.Tab>
          <Tabs.Tab>Прерывания</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel>
          <RtcSettings />
        </Tabs.Panel>
        <Tabs.Panel>Interrupts</Tabs.Panel>
      </Tabs>
    </PeripheryWrapper>
    <RtcInner />
  </RtcForm>
);

export default Rtc;
