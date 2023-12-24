import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Form from '@controls/Form';
import Select from '@controls/NewSelect';
import Tabs from '@controls/Tabs';

import { FormSticky } from '@components/FormSticky';
import Layout from '@components/Layout';
import { PeripheryWrapper } from '@components/PeripheryWrapper';
import FormUnsavedPrompt from '@components/UnsavedPrompt';
import Checkbox from '@components/controls/Checkbox';
import CheckboxGroup from '@components/controls/CheckboxGroup';

import { RootState } from '@store/index';
import {
  PccState,
  clockSourceOptions,
  monitorClockSourceOptions,
  pccInitialState,
  pccStateSchema,
  setPcc,
  systemSourceOptions,
} from '@store/system/pcc';

import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import typography from '@scripts/typography';

const PccSettings = () => (
  <>
    <p css={{ marginTop: scale(1), marginBottom: scale(2), ...typography('labelMedium'), color: colors.link }}>
      Источники тактирования
    </p>
    <Form.Field name="clockSources">
      <CheckboxGroup>
        {clockSourceOptions.map(source => (
          <Checkbox key={source.value} value={source.value}>
            {source.key}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </Form.Field>
    <p css={{ marginTop: scale(3), marginBottom: scale(2), ...typography('labelMedium'), color: colors.link }}>
      Монитор частоты
    </p>
    <Form.Field name="systemSource" label="Приоритетный источник тактирования системы">
      <Select options={systemSourceOptions} />
    </Form.Field>
    <Form.Field name="forceSystemSource" css={{ marginTop: scale(1) }}>
      <Checkbox>Задать выбранный источник системы принудительно</Checkbox>
    </Form.Field>
    <Form.Field
      name="monitorSource"
      label="Приоритетный опорный источник тактирования монитора частоты"
      css={{ marginTop: scale(2) }}
    >
      <Select options={monitorClockSourceOptions} />
    </Form.Field>
    <p css={{ marginTop: scale(3), marginBottom: scale(2), ...typography('labelMedium'), color: colors.link }}>
      Делители частоты
    </p>
    <Layout cols={3}>
      <Form.Field name="ahb" label="Делитель шины AHB" />
      <Form.Field name="apb_m" label="Делитель шины APB_M" />
      <Form.Field name="ahb_p" label="Делитель шины AHB_P" />
    </Layout>
    <p css={{ marginTop: scale(3), marginBottom: scale(2), ...typography('labelMedium'), color: colors.link }}>
      Калибровочные коэффициенты внутренних источников частоты
    </p>
    <Layout cols={2}>
      <Form.Field name="coeff_HSI32M" label="Коэффициент для HSI32M" />
      <Form.Field name="coeff_LSI32K" label="Коэффициент для LSI32K" />
    </Layout>
    <FormUnsavedPrompt />
  </>
);

const PccForm = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const otp = useSelector<RootState, PccState>(state => state.system.pcc);
  const form = useForm<PccState>({
    defaultValues: otp,
    mode: 'all',
    resolver: zodResolver(pccStateSchema),
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
          dispatch(setPcc(vals));
          form.reset(vals);
        }}
        onReset={(_, keepStateOptions) => {
          if (!keepStateOptions?.keepIsSubmitted) return;

          dispatch(setPcc(form.getValues()));
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

const PccInner = () => {
  const formContext = useFormContext();
  const pcc = useSelector<RootState, PccState>(state => state.system.pcc);

  const dispatch = useDispatch();
  return (
    <FormSticky
      onDefaultReset={() => {
        dispatch(setPcc(pccInitialState));
        formContext.reset(pccInitialState);
      }}
      onReset={() => {
        formContext.reset(pcc);
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
const FormInner = () => (
  <PeripheryWrapper title="Настройки PCC" css={{ marginBottom: scale(4) }}>
    <Tabs css={{ marginTop: scale(2) }} keepMounted>
      <Tabs.Tab title="Настройки" id="0">
        <PccSettings />
      </Tabs.Tab>
      <Tabs.Tab title="Прерывания" id="1">
        Прерывания в разработке
      </Tabs.Tab>
    </Tabs>
  </PeripheryWrapper>
);

const Otp = () => (
  <PccForm>
    <FormInner />
    <PccInner />
  </PccForm>
);

export default Otp;
