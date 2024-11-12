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

import { RootState } from '@store/index';
import {
  EEPROM_MODE_OPTIONS,
  EEPROMState as State,
  eepromInitialState as initialState,
  eepromStateSchema as schema,
  setEEPROM as setSlice,
} from '@store/system/eeprom';

import { scale } from '@scripts/helpers';

const SHORT_NAME = 'EEPROM';
const FULL_NAME = 'EEPROM';
const SETTINGS_OF = 'EEPROM';

const useData = () => useSelector<RootState, State>(state => state.system.eeprom);

const Settings = () => {
  const [enabled] = useWatch({
    name: ['enabled'],
  });

  if (!enabled) return null;

  return (
    <>
      <Form.Field name="mode" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <div css={{ display: 'flex', gap: scale(1) }}>
              <span>Режим</span>
              <DetailsTrigger title="Режим" description="Информация. TODO" />
            </div>
          }
          options={EEPROM_MODE_OPTIONS}
        />
      </Form.Field>
      <Form.Field name="errorCorrection" css={{ marginBottom: scale(2) }}>
        <Checkbox>Коррекция ошибок</Checkbox>
      </Form.Field>
      <Form.Field name="enableInterrupts" css={{ marginBottom: scale(2) }}>
        <Checkbox>Прерывания</Checkbox>
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
      <Settings />
    </PeripheryWrapper>
    <Inner />
  </TheForm>
);

export default Periphery;
