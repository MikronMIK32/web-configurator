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
import Select from '@components/controls/NewSelect';
import Tabs from '@components/controls/Tabs';

import {
  CLOCK_SOURCE_OPTIONS,
  TempState as State,
  tempInitialState as initialState,
  tempStateSchema as schema,
  setTemp as setSlice,
  useFreqencyCorrection,
} from '@store/project/analog/temp';
import { RootState } from '@store/index';

import { scale } from '@scripts/helpers';

const SHORT_NAME = 'Темп. сенсор';
const FULL_NAME = 'Температурный сенсор';
const SETTINGS_OF = 'температурного сенсора';

const Settings = () => {
  const [enabled, clockSource, freq] = useWatch({
    name: ['enabled', 'clockSource', 'freq'],
  });

  const { actualFreq, actualFreqAt, isRunning } = useFreqencyCorrection(clockSource, freq);
  // console.log(actualFreq, isRunning);

  if (!enabled) return null;

  return (
    <>
      <Form.Field name="clockSource" css={{ marginBottom: scale(2), marginTop: scale(2) }}>
        <Select
          label={
            <div css={{ display: 'flex', gap: scale(1) }}>
              <span>Источник тактирования температурного сенсора</span>
              <DetailsTrigger title="Источник тактирования температурного сенсора" description="Информация. TODO" />
            </div>
          }
          options={CLOCK_SOURCE_OPTIONS}
        />
      </Form.Field>
      <Form.Field
        name="freq"
        hint="От 0 до 100 000 Гц"
        label="Частота сенсора, Гц"
        css={{ marginBottom: scale(2) }}
        {...(actualFreq === null && {
          error: 'Данная частота недостижима',
        })}
      />
      {actualFreq && (
        <p>
          В действительности частота составит{' '}
          {isRunning ? (
            '...'
          ) : (
            <>
              {Math.floor(actualFreq)} Гц при значении делителя= {actualFreqAt}
            </>
          )}
        </p>
      )}
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
  const temp = useSelector<RootState, State>(state => state.project.analog.temp);
  const form = useForm<State>({
    defaultValues: temp,
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
  const temp = useSelector<RootState, State>(state => state.project.analog.temp);

  const dispatch = useDispatch();
  return (
    <FormSticky
      onDefaultReset={() => {
        dispatch(setSlice(initialState));
        formContext.reset(initialState);
      }}
      onReset={() => {
        formContext.reset(temp);
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
