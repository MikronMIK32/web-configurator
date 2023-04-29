import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useEffect } from 'react';
import { useForm, useFormContext, useWatch } from 'react-hook-form';

import { FormSticky } from '@components/FormSticky';
import LabelWithInfo from '@components/LabelWithInfo';
import { PeripheryWrapper } from '@components/PeripheryWrapper';
import FormUnsavedPrompt from '@components/UnsavedPrompt';
import Form from '@components/controls/Form';
import Select from '@components/controls/NewSelect';
import Tabs from '@components/controls/Tabs';

import {
  Mode,
  SlaveSignalControl,
  SpiState,
  dividerOptions,
  modeOptions,
  packageSizeOptions,
  peripheralDecoderOptions,
  slaveOptions,
  slaveSignalControlOptions,
  spiInitialState,
  spiInitialStateMaster,
  spiStateSchema,
  tickPhaseOptions,
  tickPolarityOptions,
} from '@store/interface/spi';

import { scale } from '@scripts/helpers';
import { usePrevious } from '@scripts/hooks/usePrevious';

const SpiSettings = () => {
  const { setValue, trigger } = useFormContext<SpiState>();
  const [mode, slaveSignalControl] = useWatch<SpiState>({
    name: ['mode', 'slaveSignalControl'] as const,
  });

  const prevMode = usePrevious(mode);

  useEffect(() => {
    if (!prevMode) return;

    if (mode === Mode.MASTER && prevMode !== Mode.MASTER) {
      (Object.keys(spiInitialStateMaster) as (keyof typeof spiInitialStateMaster)[]).forEach(key => {
        setValue(key, spiInitialStateMaster[key], {
          shouldValidate: false,
          shouldDirty: false,
          shouldTouch: false,
        });
      });

      trigger();
    }
  }, [mode, prevMode, setValue, trigger]);

  if (mode === Mode.DISABLED) return null;

  return (
    <>
      {mode === Mode.MASTER && (
        <Form.Field name="divider" css={{ marginBottom: scale(2) }}>
          <Select
            label={
              <LabelWithInfo title="TODO" description="TODO">
                Делитель частоты
              </LabelWithInfo>
            }
            options={dividerOptions}
          />
        </Form.Field>
      )}
      <Form.Field name="tickPhase" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <LabelWithInfo title="TODO" description="TODO">
              Фаза тактового сигнала
            </LabelWithInfo>
          }
          options={tickPhaseOptions}
        />
      </Form.Field>
      <Form.Field name="tickPolarity" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <LabelWithInfo title="TODO" description="TODO">
              Полярность тактового сигнала вне слова
            </LabelWithInfo>
          }
          options={tickPolarityOptions}
        />
      </Form.Field>
      <Form.Field name="packageSize" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <LabelWithInfo title="TODO" description="TODO">
              Длина передаваемой посылки
            </LabelWithInfo>
          }
          options={packageSizeOptions}
        />
      </Form.Field>
      {mode === Mode.MASTER && (
        <>
          <Form.Field name="peripheralDecoder" css={{ marginBottom: scale(2) }}>
            <Select
              label={
                <LabelWithInfo title="TODO" description="TODO">
                  Периферийный декодер
                </LabelWithInfo>
              }
              options={peripheralDecoderOptions}
            />
          </Form.Field>
          <Form.Field name="slaveSignalControl" css={{ marginBottom: scale(2) }}>
            <Select
              label={
                <LabelWithInfo title="TODO" description="TODO">
                  Режим управления сигналом выбора ведомого
                </LabelWithInfo>
              }
              options={slaveSignalControlOptions}
            />
          </Form.Field>
          {slaveSignalControl === SlaveSignalControl.AUTO && (
            <Form.Field name="slave" css={{ marginBottom: scale(2) }}>
              <Select
                label={
                  <LabelWithInfo title="TODO" description="TODO">
                    Ведомый
                  </LabelWithInfo>
                }
                options={slaveOptions}
              />
            </Form.Field>
          )}
        </>
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
    <Form.Field
      name="mode"
      label={
        <LabelWithInfo title="Spi" description="Информация об Spi">
          Режим работы
        </LabelWithInfo>
      }
    >
      <Select options={modeOptions} />
    </Form.Field>
  </div>
);

const SpiForm = ({
  children,
  initialValues,
  onSubmit,
}: {
  children: ReactNode;
  initialValues: SpiState;
  onSubmit: (values: SpiState) => void;
}) => {
  const form = useForm<SpiState>({
    defaultValues: initialValues,
    mode: 'all',
    resolver: zodResolver(spiStateSchema),
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

const SpiInner = ({ onSubmit, initialValues }: { initialValues: SpiState; onSubmit: (values: SpiState) => void }) => {
  const formContext = useFormContext();

  return (
    <FormSticky
      onDefaultReset={() => {
        onSubmit(spiInitialState);
        formContext.reset(spiInitialState);
      }}
      onReset={() => {
        formContext.reset(initialValues);
      }}
      css={{
        padding: scale(2),
        justifyContent: 'end',
      }}
    />
  );
};

const SpiComponent = ({
  name,
  initialValues,
  onSubmit,
}: {
  name: string;
  initialValues: SpiState;
  onSubmit: (values: SpiState) => void;
}) => (
  <SpiForm initialValues={initialValues} onSubmit={onSubmit}>
    <PeripheryWrapper title={`Настройки ${name}`}>
      <CommonSettings />
      <Tabs css={{ marginTop: scale(2) }} forceRenderTabPanel>
        <Tabs.List>
          <Tabs.Tab>Настройки</Tabs.Tab>
          <Tabs.Tab>DMA</Tabs.Tab>
          <Tabs.Tab>Прерывания</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel>
          <SpiSettings />
        </Tabs.Panel>
        <Tabs.Panel>В работе</Tabs.Panel>
        <Tabs.Panel>В работе</Tabs.Panel>
      </Tabs>
    </PeripheryWrapper>
    <SpiInner initialValues={initialValues} onSubmit={onSubmit} />
  </SpiForm>
);

export default SpiComponent;
