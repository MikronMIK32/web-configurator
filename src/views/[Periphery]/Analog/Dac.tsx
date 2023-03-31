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
import IntegerMaskedInput from '@components/controls/IntegerMaskedInput';
import Select from '@components/controls/NewSelect';
import Tabs from '@components/controls/Tabs';

import { DacChannel, DacState, VRef, dacInitialState, dacStateSchema, setDac } from '@store/analog/dac';
import { RootState } from '@store/index';

import { scale } from '@scripts/helpers';

const CHANNEL_OPTIONS: Record<DacChannel, string> = {
  [DacChannel.CHANNEL_1]: 'ЦАП_1',
  [DacChannel.CHANNEL_2]: 'ЦАП_2',
};

const DacSettings = () => {
  const [dacEnabled] = useWatch({
    name: ['enabled'],
  });

  if (!dacEnabled) return null;

  return (
    <>
      <Form.Field name="channel" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <div css={{ display: 'flex', gap: scale(1) }}>
              <span>Канал</span>
              <DetailsTrigger title="Канал ЦАП" description="Информация о канале. TODO" />
            </div>
          }
          options={Object.values(DacChannel).map(value => ({
            key: CHANNEL_OPTIONS[value as DacChannel],
            value,
          }))}
        />
      </Form.Field>
      <Form.Field name="vRef" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <div css={{ display: 'flex', gap: scale(1) }}>
              <span>Источник опорного напряжения</span>
              <DetailsTrigger
                title="Источник опорного напряжения"
                description="Информация об источнике опорного напряжения. TODO"
              />
            </div>
          }
          options={[
            {
              value: VRef.INNER,
              key: 'Внутренний',
            },
            {
              value: VRef.CALIBRATABLE,
              key: 'Настраиваемый',
            },
            {
              value: VRef.ADC_REF,
              key: 'Внешний вывод ADC_REF',
            },
          ]}
        />
      </Form.Field>
      <Form.Field name="divider" label="Делитель">
        <IntegerMaskedInput placeholder="Вводите 2, 10 или 16-ричное число" />
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
      <Checkbox>Включить DAC</Checkbox>
    </Form.Field>
    <DetailsTrigger title="DAC" description="Информация об DAC" />
  </div>
);

const DacForm = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const dac = useSelector<RootState, DacState>(state => state.analog.dac);
  const form = useForm<DacState>({
    defaultValues: dac,
    mode: 'all',
    resolver: zodResolver(dacStateSchema),
    shouldFocusError: false,
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
          dispatch(setDac(vals));
          form.reset(vals);
        }}
        onReset={() => {
          dispatch(setDac(form.getValues()));
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

const DacInner = () => {
  const formContext = useFormContext();
  const dac = useSelector<RootState, DacState>(state => state.analog.dac);

  const dispatch = useDispatch();
  return (
    <FormSticky
      onDefaultReset={() => {
        dispatch(setDac(dacInitialState));
        formContext.reset(dacInitialState);
      }}
      onReset={() => {
        formContext.reset(dac);
      }}
      css={{
        padding: scale(2),
        justifyContent: 'end',
      }}
    />
  );
};

const Dac = () => (
  <DacForm>
    <PeripheryWrapper title="Настройки DAC">
      <CommonSettings />
      <Tabs css={{ marginTop: scale(2) }} forceRenderTabPanel>
        <Tabs.List>
          <Tabs.Tab>Настройки</Tabs.Tab>
          <Tabs.Tab>Прерывания</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel>
          <DacSettings />
        </Tabs.Panel>
        <Tabs.Panel>Interrupts</Tabs.Panel>
      </Tabs>
    </PeripheryWrapper>
    <DacInner />
  </DacForm>
);

export default Dac;
