import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm, useFormContext, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from '@controls/Checkbox';
import Form from '@controls/Form';
import IntegerMaskedInput from '@controls/IntegerMaskedInput';
import Select from '@controls/NewSelect';
import Tabs from '@controls/Tabs';

import { DetailsTrigger } from '@components/DetailsTrigger';
import { FormSticky } from '@components/FormSticky';
import { PeripheryWrapper } from '@components/PeripheryWrapper';
import FormUnsavedPrompt from '@components/UnsavedPrompt';

import { DacChannel, DacState, VRef, dacInitialState, dacStateSchema, setDac } from '@store/project/analog/dac';

import { scale } from '@scripts/helpers';
import { RootState } from '@store/index';

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

const DacInner = () => {
  const formContext = useFormContext();
  const dac = useSelector<RootState, DacState>(state => state.project.analog.dac);
  const dispatch = useDispatch();

  return (
    <>
      <PeripheryWrapper title="Настройки DAC">
        <CommonSettings />
        <Tabs css={{ marginTop: scale(2) }} keepMounted>
          <Tabs.Tab title="Настройки" id="0">
            <DacSettings />
          </Tabs.Tab>
          <Tabs.Tab title="Прерывания" id="1">
            Interrupts
          </Tabs.Tab>
        </Tabs>
      </PeripheryWrapper>
      <FormSticky
        onDefaultReset={() => {
          dispatch(setDac(dacInitialState));
          formContext.reset(dacInitialState);
        }}
        onReset={() => {
          formContext.reset(dac);
        }}
        css={{
          justifyContent: 'end',
          marginBottom: -scale(2),
          marginLeft: -scale(2),
          marginRight: -scale(2),
        }}
      />
    </>
  );
};

const Dac = () => {
  const dispatch = useDispatch();
  const dac = useSelector<RootState, DacState>(state => state.project.analog.dac);
  const form = useForm<DacState>({
    defaultValues: dac,
    mode: 'all',
    resolver: zodResolver(dacStateSchema),
    shouldFocusError: false,
  });

  const onResetRef = useRef<() => void>(null);

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

          onResetRef.current?.();
        }}
        css={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <DacInner />
      </Form>
    </div>
  );
};

export default Dac;
