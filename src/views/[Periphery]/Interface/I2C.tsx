import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useEffect, useRef } from 'react';
import { useForm, useFormContext, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Form from '@controls/Form';
import IntegerMaskedInput from '@controls/IntegerMaskedInput';
import Select from '@controls/NewSelect';
import Tabs from '@controls/Tabs';

import { FormSticky } from '@components/FormSticky';
import LabelWithInfo from '@components/LabelWithInfo';
import Layout from '@components/Layout';
import { PeripheryWrapper } from '@components/PeripheryWrapper';
import FormUnsavedPrompt from '@components/UnsavedPrompt';
import Checkbox from '@components/controls/Checkbox';

import { RootState } from '@store/index';
import {
  EXTRA_ADDRESS_MASK_OPTIONS,
  I2CState,
  Mode,
  i2cStateSchema,
  initialState,
  masterInitialState,
  modeOptions,
  setI2C0,
  slaveInitialState,
} from '@store/interface/i2c';

import { colors } from '@scripts/colors';
import { objectDotEntries, scale } from '@scripts/helpers';
import { usePrevious } from '@scripts/hooks/usePrevious';
import typography from '@scripts/typography';

const I2CSettings = () => {
  const { setValue, trigger } = useFormContext<I2CState>();
  const [mode, extraAddressEnabled, stretchClockSingal] = useWatch({
    name: ['mode', 'extraAddressEnabled', 'stretchClockSingal'] as const,
  }) as [Mode, boolean, boolean];

  const currentMode = useRef(mode);
  currentMode.current = mode;

  useEffect(() => {
    if (currentMode.current !== Mode.SLAVE) return;

    const dependandKeys = ['extraAddress', 'extraAddressMask', 'stretchClockSingal'];
    dependandKeys.forEach(key => {
      setValue(key as any, null as any, {
        shouldValidate: true,
        shouldDirty: false,
        shouldTouch: false,
      });
    });
  }, [setValue]);

  const prevMode = usePrevious(mode);

  useEffect(() => {
    if (!prevMode || !mode) return;
    if (prevMode === mode) return;

    const modesToValues = {
      disabled: initialState,
      master: masterInitialState,
      slave: slaveInitialState,
    } as const;

    const entries = objectDotEntries(modesToValues[mode]);

    entries.forEach(entry => {
      const [key, value] = entry;
      setValue(key as any, value, {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });
    });

    trigger();
  }, [mode, prevMode, setValue, trigger]);

  const extraAddressRef = useRef<HTMLDivElement>(null);

  if (mode === Mode.DISABLED) return null;

  return (
    <>
      <Layout cols={1} css={{ marginTop: scale(2) }}>
        <Form.Field name="digitalFilter" label="Цифровой фильтр">
          <IntegerMaskedInput />
        </Form.Field>
        <Form.Field name="analogFilter">
          <Checkbox>Аналоговый фильтр</Checkbox>
        </Form.Field>
        <Form.Field name="autoEnd">
          <Checkbox>Автоматическое окончание</Checkbox>
        </Form.Field>
      </Layout>
      <p css={{ marginTop: scale(4), marginBottom: scale(2), ...typography('labelMedium'), color: colors.link }}>
        Настройки частоты
      </p>
      <Layout cols={2}>
        <Layout.Item col={2}>
          <Form.Field name="frequency.preliminaryDivider" label="Предварительный делитель частоты" />
        </Layout.Item>
        <Layout.Item col={2}>
          <Form.Field name="frequency.scldelDuration" label="Длительность предустановки данных SCLDEL" />
        </Layout.Item>
        <Layout.Item col={2}>
          <Form.Field name="frequency.sdadelDuration" label="Длительность предустановки данных SDADEL" />
        </Layout.Item>
        {mode === Mode.MASTER && (
          <>
            <Layout.Item col={1}>
              <Form.Field
                name="frequency.sclHoldOneDuration"
                label={`Длительность удержания SCL в состоянии логической "1"`}
              />
            </Layout.Item>
            <Layout.Item col={1}>
              <Form.Field
                name="frequency.sclHoldZeroDuration"
                label={`Длительность удержания SCL в состоянии логического "0"`}
              />
            </Layout.Item>
          </>
        )}
        {mode === Mode.SLAVE && (
          <>
            <Layout.Item col={2}>
              <Form.Field name="mainAddress" label="Основной собственный адрес">
                <IntegerMaskedInput />
              </Form.Field>
            </Layout.Item>
            <Layout.Item col={2}>
              <Form.Field name="extraAddressEnabled">
                <Checkbox
                  onChange={e => {
                    if (e.currentTarget.checked) {
                      setTimeout(() => {
                        extraAddressRef.current?.scrollIntoView({
                          behavior: 'smooth',
                        });
                      }, 0);
                    }
                  }}
                >
                  Включить дополнительный адрес
                </Checkbox>
              </Form.Field>
            </Layout.Item>
            <Layout.Item
              col={1}
              ref={extraAddressRef}
              css={{
                ...(!extraAddressEnabled && {
                  display: 'none',
                }),
              }}
            >
              <Form.Field name="extraAddress" label="Дополнительный собственный адрес">
                <IntegerMaskedInput />
              </Form.Field>
            </Layout.Item>
            <Layout.Item
              col={1}
              css={{
                ...(!extraAddressEnabled && {
                  display: 'none',
                }),
              }}
            >
              <Form.Field name="extraAddressMask" label="Маска дополнительного адреса">
                <Select options={EXTRA_ADDRESS_MASK_OPTIONS} />
              </Form.Field>
            </Layout.Item>
            <Layout.Item col={2}>
              <Form.Field name="allowSharedAddress">
                <Checkbox>Общий адрес</Checkbox>
              </Form.Field>
            </Layout.Item>

            <Layout.Item col={2}>
              <Form.Field name="stretchClockSingal">
                <Checkbox>Растягивание тактового сигнала</Checkbox>
              </Form.Field>
            </Layout.Item>
            {stretchClockSingal && (
              <Layout.Item col={2}>
                <Form.Field name="controlAck">
                  <Checkbox>Контроль бита ACK во время приема</Checkbox>
                </Form.Field>
              </Layout.Item>
            )}
          </>
        )}
      </Layout>

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
        <LabelWithInfo title="I2C" description="Информация об I2c">
          Режим работы
        </LabelWithInfo>
      }
    >
      <Select options={modeOptions} />
    </Form.Field>
  </div>
);

const I2CForm = ({
  children,
  initialValues,
  onSubmit,
}: {
  children: ReactNode;
  initialValues: I2CState;
  onSubmit: (values: I2CState) => void;
}) => {
  const form = useForm<I2CState>({
    defaultValues: initialValues,
    mode: 'all',
    resolver: zodResolver(i2cStateSchema),
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

const I2CInner = ({ onSubmit, initialValues }: { initialValues: I2CState; onSubmit: (values: I2CState) => void }) => {
  const formContext = useFormContext();

  return (
    <FormSticky
      onDefaultReset={() => {
        onSubmit(initialState);
        formContext.reset(initialState);
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

const I2C = () => {
  const dispatch = useDispatch();
  const initialValues = useSelector<RootState, I2CState>(state => state.interface.i2c.i2c0);

  const onSubmit = (vals: any) => {
    dispatch(setI2C0(vals));
  };

  return (
    <I2CForm initialValues={initialValues} onSubmit={onSubmit}>
      <PeripheryWrapper title="Настройки I2C" css={{ marginBottom: scale(4) }}>
        <CommonSettings />
        <Tabs css={{ marginTop: scale(2) }} keepMounted>
          <Tabs.Tab title="Настройки" id="0">
            <I2CSettings />
          </Tabs.Tab>
          <Tabs.Tab title="DMA" id="1">
            DMA в разработке
          </Tabs.Tab>
          <Tabs.Tab title="Прерывания" id="2">
            Прерывания в разработке
          </Tabs.Tab>
        </Tabs>
      </PeripheryWrapper>
      <I2CInner initialValues={initialValues} onSubmit={onSubmit} />
    </I2CForm>
  );
};

export default I2C;
