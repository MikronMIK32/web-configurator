import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useEffect, useRef } from 'react';
import { useForm, useFormContext, useWatch } from 'react-hook-form';

import { FormSticky } from '@components/FormSticky';
import LabelWithInfo from '@components/LabelWithInfo';
import { PeripheryWrapper } from '@components/PeripheryWrapper';
import FormUnsavedPrompt from '@components/UnsavedPrompt';
import Form from '@components/controls/Form';
import IntegerMaskedInput from '@components/controls/IntegerMaskedInput';
import { IntegerFormat } from '@components/controls/IntegerMaskedInput/types';
import Select from '@components/controls/NewSelect';
import Tabs from '@components/controls/Tabs';

import {
  Mode,
  PeripheralDecoder,
  SlaveSignalControl,
  SpiState,
  dividerOptions,
  internalDecoderDeviceOptions,
  modeOptions,
  peripheralDecoderOptions,
  slaveOptions,
  slaveSignalControlOptions,
  spiInitialState,
  spiInitialStateMaster,
  spiStateSchema,
  tickPhaseOptions,
  tickPolarityOptions,
  txThresholdOptions,
} from '@store/project/interface/spi';

import { scale } from '@scripts/helpers';
import { usePrevious } from '@scripts/hooks/usePrevious';

const SpiSettings = () => {
  const { setValue, trigger } = useFormContext<SpiState>();
  const [mode, slaveSignalControl, peripheralDecoder] = useWatch<SpiState>({
    name: ['mode', 'slaveSignalControl', 'peripheralDecoder'] as const,
  });

  const currentMode = useRef(mode);
  currentMode.current = mode;

  useEffect(() => {
    if (currentMode.current !== Mode.MASTER) return;

    const keys = ['internalDecoderDevice', 'externalDecoderDevice'];
    (keys as (keyof typeof spiInitialStateMaster)[]).forEach(key => {
      setValue(key, spiInitialStateMaster[key], {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });
    });
  }, [peripheralDecoder, setValue]);

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
      <Form.Field name="txThreshold" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <LabelWithInfo title="TODO" description="TODO">
              Пороговое значение TX
            </LabelWithInfo>
          }
          options={txThresholdOptions}
        />
      </Form.Field>
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
          {peripheralDecoder === PeripheralDecoder.ONE_OF_FOUR ? (
            <Form.Field name="internalDecoderDevice" label="Устройство декодера" css={{ marginBottom: scale(2) }}>
              <Select options={internalDecoderDeviceOptions} />
            </Form.Field>
          ) : (
            <Form.Field name="externalDecoderValue" label="Значение внешнего декодера" css={{ marginBottom: scale(2) }}>
              <IntegerMaskedInput format={IntegerFormat.BIN} />
            </Form.Field>
          )}
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
        justifyContent: 'end',
        marginBottom: -scale(2),
        marginLeft: -scale(2),
        marginRight: -scale(2),
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
      <Tabs css={{ marginTop: scale(2) }} keepMounted>
        <Tabs.Tab title="Настройки" id="0">
          <SpiSettings />
        </Tabs.Tab>
        <Tabs.Tab title="DMA" id="1">
          DMA в разработке
        </Tabs.Tab>
        <Tabs.Tab title="Прерывания" id="2">
          Прерывания в разработке
        </Tabs.Tab>
      </Tabs>
    </PeripheryWrapper>
    <SpiInner initialValues={initialValues} onSubmit={onSubmit} />
  </SpiForm>
);

export default SpiComponent;
