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
  CryptoState,
  algoOptions,
  cryptoInitialState,
  cryptoStateSchema,
  modeOptions,
  setCrypto,
  wordOrderOptions,
  wordPermutationOptions,
} from '@store/crypto/crypto';
import { RootState } from '@store/index';

import { scale } from '@scripts/helpers';

const CryptoSettings = () => {
  const [cryptoEnabled] = useWatch<CryptoState>({
    name: ['enabled'] as const,
  });

  if (!cryptoEnabled) return null;

  return (
    <>
      <Form.Field name="algorithm" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <div css={{ display: 'flex', gap: scale(1) }}>
              <span>Алгоритм шифрования</span>
              <DetailsTrigger title="Алгоритм шифрования" description="Информация. TODO" />
            </div>
          }
          options={algoOptions}
        />
      </Form.Field>
      <Form.Field name="mode" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <div css={{ display: 'flex', gap: scale(1) }}>
              <span>Режим шифрования</span>
              <DetailsTrigger
                title="Режим шифрования"
                description={`
                  Описание:
                    <ul>
                      <li>ECB - Electronic codebook</li>
                      <li>CBC - Cipher Block Chaining</li>
                      <li>CTR - Counter mode</li>
                    </ul>
                `}
              />
            </div>
          }
          options={modeOptions}
        />
      </Form.Field>
      <Form.Field name="permutation" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <div css={{ display: 'flex', gap: scale(1) }}>
              <span>Перестановка слова</span>
              <DetailsTrigger title="Перестановка слова" description="Информация. TODO" />
            </div>
          }
          options={wordPermutationOptions}
        />
      </Form.Field>
      <Form.Field name="order" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <div css={{ display: 'flex', gap: scale(1) }}>
              <span>Порядок загрузки/выгрузки</span>
              <DetailsTrigger title="Порядок загрузки/выгрузки" description="Информация. TODO" />
            </div>
          }
          options={wordOrderOptions}
        />
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
      <Checkbox>Включить крипто-блок</Checkbox>
    </Form.Field>
    <DetailsTrigger title="Crypto" description="Информация об Crypto" />
  </div>
);

const CryptoForm = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const crypto = useSelector<RootState, CryptoState>(state => state.crypto.crypto);
  const form = useForm<CryptoState>({
    defaultValues: crypto,
    mode: 'all',
    resolver: zodResolver(cryptoStateSchema),
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
          dispatch(setCrypto(vals));
          form.reset(vals);
        }}
        onReset={(_, keepStateOptions) => {
          if (!keepStateOptions?.keepIsSubmitted) return;

          dispatch(setCrypto(form.getValues()));
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

const CryptoInner = () => {
  const formContext = useFormContext();
  const crypto = useSelector<RootState, CryptoState>(state => state.crypto.crypto);

  const dispatch = useDispatch();
  return (
    <FormSticky
      onDefaultReset={() => {
        dispatch(setCrypto(cryptoInitialState));
        formContext.reset(cryptoInitialState);
      }}
      onReset={() => {
        formContext.reset(crypto);
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

const Crypto = () => (
  <CryptoForm>
    <PeripheryWrapper title="Настройки crypto">
      <CommonSettings />
      <Tabs css={{ marginTop: scale(2) }} keepMounted>
        <Tabs.Tab title="Настройки" id="0">
          <CryptoSettings />
        </Tabs.Tab>
        <Tabs.Tab title="DMA" id="1">
          DMA
        </Tabs.Tab>
      </Tabs>
    </PeripheryWrapper>
    <CryptoInner />
  </CryptoForm>
);

export default Crypto;
