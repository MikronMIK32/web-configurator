import { CSSObject } from '@emotion/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
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

import {
  CRC_DB,
  CRC_NAMES_TYPE,
  CrcState,
  KNOWN_CRC_NAMES,
  crcInitialState,
  crcStateSchema,
  setCrc,
} from '@store/crypto/crc';
import { RootState } from '@store/index';

import { scale } from '@scripts/helpers';
import { usePrevious } from '@scripts/hooks/usePrevious';

const FLEX_CSS: CSSObject = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const crcOptions = [
  { key: 'Кастомный', content: <b>Кастомный</b>, value: 'CUSTOM' },
  ...KNOWN_CRC_NAMES.map(name => ({ key: name, value: name })),
];

const CrcSettings = () => {
  const formContext = useFormContext<CrcState>();
  const [crcEnabled, algorithm] = useWatch<CrcState>({
    name: ['enabled', 'algorithm'] as const,
  });

  const isCustom = algorithm === 'CUSTOM';
  const prevAlgo = usePrevious(algorithm);

  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (crcEnabled === undefined || algorithm === undefined) return;
    if (algorithm === prevAlgo) return;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const isCustom = algorithm === 'CUSTOM';

    if (isCustom || !algorithm) {
      formContext.reset(
        {
          ...crcInitialState,
          enabled: crcEnabled as boolean,
        },
        {
          keepDirty: true,
          keepTouched: true,
          keepIsSubmitted: false,
          keepDefaultValues: true,
        }
      );
      return;
    }

    const algo = algorithm as CRC_NAMES_TYPE;

    const CRC = CRC_DB[algo];

    formContext.reset(
      {
        enabled: crcEnabled as boolean,
        algorithm: algo,
        ...CRC,
      },
      {
        keepDirty: true,
        keepTouched: true,
        keepIsSubmitted: false,
        keepDefaultValues: true,
      }
    );
  }, [algorithm, formContext, crcEnabled, prevAlgo, isLoaded]);

  useLayoutEffect(() => {
    setLoaded(true);
  }, []);

  if (!crcEnabled) return null;

  return (
    <>
      <Form.Field name="algorithm" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <div css={{ display: 'flex', gap: scale(1) }}>
              <span>Алгоритм</span>
              <DetailsTrigger title="Алгоритм CRC" description="Информация. TODO" />
            </div>
          }
          options={crcOptions}
        />
      </Form.Field>
      <Form.Field name="poly" label="Poly" css={{ marginBottom: scale(2) }} disabled={!isCustom}>
        <IntegerMaskedInput />
      </Form.Field>
      <Form.Field name="init" label="Init" css={{ marginBottom: scale(2) }} disabled={!isCustom}>
        <IntegerMaskedInput />
      </Form.Field>
      <Form.Field name="xorOut" label="XOR out" css={{ marginBottom: scale(2) }} disabled={!isCustom}>
        <Select
          options={[
            {
              key: '0x00000000',
              value: '0x00000000',
            },
            {
              key: '0xFFFFFFFF',
              value: '0xFFFFFFFF',
            },
          ]}
        />
      </Form.Field>
      <div css={FLEX_CSS}>
        <Form.Field name="refIn" css={{ marginBottom: scale(2) }} disabled={!isCustom}>
          <Checkbox>Ref IN</Checkbox>
        </Form.Field>
        <DetailsTrigger title="Ref IN" description="Информация о" />
      </div>
      <div css={FLEX_CSS}>
        <Form.Field name="refOut" disabled={!isCustom}>
          <Checkbox>Ref OUT</Checkbox>
        </Form.Field>
        <DetailsTrigger title="Ref OUT" description="Информация о" />
      </div>
      <FormUnsavedPrompt />
    </>
  );
};

const CommonSettings = () => (
  <div css={[FLEX_CSS, { marginBottom: scale(1) }]}>
    <Form.Field name="enabled">
      <Checkbox>Включить CRC</Checkbox>
    </Form.Field>
    <DetailsTrigger title="CRC" description="Информация об CRC" />
  </div>
);

const AdcForm = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const crc = useSelector<RootState, CrcState>(state => state.crypto.crc);
  const form = useForm<CrcState>({
    defaultValues: crc,
    mode: 'all',
    resolver: zodResolver(crcStateSchema),
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
          dispatch(setCrc(vals));
          form.reset(vals);
        }}
        onReset={(_, keepStateOptions) => {
          if (!keepStateOptions?.keepIsSubmitted) return;

          dispatch(setCrc(form.getValues()));
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

const AdcInner = () => {
  const formContext = useFormContext();
  const crc = useSelector<RootState, CrcState>(state => state.crypto.crc);

  const dispatch = useDispatch();
  return (
    <FormSticky
      onDefaultReset={() => {
        dispatch(setCrc(crcInitialState));
        formContext.reset(crcInitialState);
      }}
      onReset={() => {
        formContext.reset(crc);
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

const Adc = () => (
  <AdcForm>
    <PeripheryWrapper title="Настройки CRC">
      <CommonSettings />
      <div css={{ marginTop: scale(2) }}>
        <CrcSettings />
      </div>
    </PeripheryWrapper>
    <AdcInner />
  </AdcForm>
);

export default Adc;
