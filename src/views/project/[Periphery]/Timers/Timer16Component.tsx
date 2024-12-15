import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, ReactNode, useMemo } from 'react';
import { useForm, useFormContext, useWatch } from 'react-hook-form';

import Form from '@controls/Form';
import Select, { OptionShape } from '@controls/NewSelect';
import Tabs from '@controls/Tabs';

import { FormSticky } from '@components/FormSticky';
import LabelWithInfo from '@components/LabelWithInfo';
import Layout from '@components/Layout';
import { PeripheryWrapper } from '@components/PeripheryWrapper';
import FormUnsavedPrompt from '@components/UnsavedPrompt';
import Checkbox from '@components/controls/Checkbox';

import {
  Timer16Mode,
  Timer16State,
  TriggerSource,
  activeFrontOptions,
  dividerOptions,
  getTriggerSourceOptions,
  timer16InitialState,
  timer16StateSchema,
  timerDigitalFilterOptions,
  timerModeOptions,
  timerPolarityOptions,
  updateModeOptions,
  wavePolarityOptions,
} from '@store/project/timers/timer16';

import { colors } from '@scripts/colors';
import { objectDotEntries, scale } from '@scripts/helpers';
import typography from '@scripts/typography';

const Timer16Settings = ({ triggerSourceOptions }: { triggerSourceOptions: OptionShape[] }) => {
  const [mode, externalTrigger, generateWaveForm] = useWatch<Timer16State>({
    name: ['mode', 'externalTrigger', 'generateWaveForm'] as const,
  }) as never as [Timer16Mode, boolean, boolean];

  if (mode === Timer16Mode.DISABLED) return null;

  return (
    <>
      <p css={{ marginTop: scale(1), marginBottom: scale(2), ...typography('labelMedium'), color: colors.link }}>
        Настройки частоты
      </p>
      <Layout cols={2}>
        {mode !== Timer16Mode.EXTERNAL_CLOCK_SYNC && mode !== Timer16Mode.ENCODER && (
          <Layout.Item col={2}>
            <Form.Field name="frequency.divider" label="Делитель частоты">
              <Select options={dividerOptions} />
            </Form.Field>
          </Layout.Item>
        )}
        {mode !== Timer16Mode.INTERNAL_CLOCK && (
          <Layout.Item col={2}>
            <Form.Field name="frequency.polarity" label="Полярность синхронизации">
              <Select options={timerPolarityOptions} />
            </Form.Field>
          </Layout.Item>
        )}
      </Layout>
      <p css={{ marginTop: scale(4), marginBottom: scale(2), ...typography('labelMedium'), color: colors.link }}>
        Обновление значения сравнения и перезагрузки
      </p>
      <Form.Field name="updateMode" label="Режим обновления">
        <Select options={updateModeOptions} />
      </Form.Field>

      <p css={{ marginTop: scale(4), marginBottom: scale(2), ...typography('labelMedium'), color: colors.link }}>
        Триггер
      </p>
      <Form.Field
        name="triggerSource"
        label="Источник триггера"
        css={{ marginBottom: scale(2) }}
        disabled={!externalTrigger}
      >
        <Select options={triggerSourceOptions} />
      </Form.Field>
      {externalTrigger && (
        <Form.Field name="triggerDigitalFilter" label="Цифровой фильтр для триггера">
          <Select options={timerDigitalFilterOptions} />
        </Form.Field>
      )}
      {externalTrigger && (
        <Form.Field name="activeFront" label="Активный фронт">
          <Select options={activeFrontOptions} />
        </Form.Field>
      )}
      {generateWaveForm && (
        <>
          <p css={{ marginTop: scale(4), marginBottom: scale(2), ...typography('labelMedium'), color: colors.link }}>
            Выходной сигнал
          </p>
          <Form.Field name="wavePolarity" label="Полярность волны">
            <Select options={wavePolarityOptions} />
          </Form.Field>
        </>
      )}
      <FormUnsavedPrompt />
    </>
  );
};

const CommonSettings = ({ triggerSourceOptions }: { triggerSourceOptions: OptionShape[] }) => {
  const { watch, setValue, trigger, getValues } = useFormContext<Timer16State>();

  const mode = watch('mode');

  const onModeChange = (newMode: Timer16Mode) => {
    const entries = objectDotEntries(timer16InitialState);

    entries.forEach(entry => {
      const [key, value] = entry;
      setValue(key as any, value, {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });
    });

    if (newMode === Timer16Mode.DISABLED) {
      setValue('externalTrigger', false);
      setValue('generateWaveForm', false);
    }

    trigger();
  };

  const onExternalTriggerChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.checked) {
      setValue('triggerSource', TriggerSource.SOFTWARE_TRIGGER);
      return;
    }

    if (!getValues().triggerSource) setValue('triggerSource', triggerSourceOptions[0].value!);
  };

  return (
    <Layout cols={1}>
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: scale(1),
        }}
      >
        <Form.Field
          name="mode"
          label={
            <LabelWithInfo title="Timer16" description="Информация о Timer16">
              Режим работы
            </LabelWithInfo>
          }
        >
          <Select options={timerModeOptions} onChange={val => onModeChange(val as never as Timer16Mode)} />
        </Form.Field>
      </div>
      {mode !== Timer16Mode.DISABLED && (
        <>
          <Form.Field name="externalTrigger">
            <Checkbox onChange={onExternalTriggerChange}>Внешний триггер</Checkbox>
          </Form.Field>
          <Form.Field name="generateWaveForm">
            <Checkbox>Генерация волновой формы</Checkbox>
          </Form.Field>
        </>
      )}
    </Layout>
  );
};

const Timer16Form = ({
  children,
  initialValues,
  onSubmit,
}: {
  children: ReactNode;
  initialValues: Timer16State;
  onSubmit: (values: Timer16State) => void;
}) => {
  const form = useForm<Timer16State>({
    defaultValues: initialValues,
    mode: 'all',
    resolver: zodResolver(timer16StateSchema),
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
          onSubmit(vals);
          form.reset(vals);
        }}
        onReset={(_, keepStateOptions) => {
          if (!keepStateOptions?.keepIsSubmitted) return;

          onSubmit(initialValues);
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

const Timer16Inner = ({
  onSubmit,
  initialValues,
}: {
  initialValues: Timer16State;
  onSubmit: (values: Timer16State) => void;
}) => {
  const formContext = useFormContext();

  return (
    <FormSticky
      onDefaultReset={() => {
        onSubmit(timer16InitialState);
        formContext.reset(timer16InitialState);
      }}
      onReset={() => {
        formContext.reset(initialValues);
      }}
      css={{
        marginBottom: -scale(2),
        marginLeft: -scale(2),
        marginRight: -scale(2),
        justifyContent: 'end',
      }}
    />
  );
};

const Timer16FormInner = ({ name, timerNumber }: { name: string; timerNumber: 0 | 1 | 2 }) => {
  const externalTrigger = useWatch<Timer16State>({
    name: 'externalTrigger',
  }) as boolean;

  const triggerSourceOptions = useMemo(
    () => getTriggerSourceOptions(timerNumber, !externalTrigger),
    [timerNumber, externalTrigger]
  );

  return (
    <PeripheryWrapper title={`Настройки ${name}`} css={{ marginBottom: scale(4) }}>
      <CommonSettings triggerSourceOptions={triggerSourceOptions} />
      <Tabs css={{ marginTop: scale(2) }} keepMounted>
        <Tabs.Tab title="Настройки" id="0">
          <Timer16Settings triggerSourceOptions={triggerSourceOptions} />
        </Tabs.Tab>
        <Tabs.Tab title="Прерывания" id="1">
          Прерывания в разработке
        </Tabs.Tab>
      </Tabs>
    </PeripheryWrapper>
  );
};

const Timer16 = ({
  name,
  initialValues,
  timerNumber,
  onSubmit,
}: {
  name: string;
  initialValues: Timer16State;
  timerNumber: 0 | 1 | 2;
  onSubmit: (values: Timer16State) => void;
}) => (
  <Timer16Form initialValues={initialValues} onSubmit={onSubmit}>
    <Timer16FormInner name={name} timerNumber={timerNumber} />
    <Timer16Inner initialValues={initialValues} onSubmit={onSubmit} />
  </Timer16Form>
);

export default Timer16;
