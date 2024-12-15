import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { DetailsTrigger } from '@components/DetailsTrigger';
import { FormSticky } from '@components/FormSticky';
import { PeripheryWrapper } from '@components/PeripheryWrapper';
import FormUnsavedPrompt from '@components/UnsavedPrompt';
import Checkbox from '@components/controls/Checkbox';
import Form from '@components/controls/Form';
import Select from '@components/controls/NewSelect';

import { RootState } from '@store/index';
import { OtpState, otpInitialState, otpStateSchema, readModeOptions, setOtp } from '@store/project/system/otp';

import { scale } from '@scripts/helpers';

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
      <Checkbox>Включить OTP</Checkbox>
    </Form.Field>
    <DetailsTrigger title="OTP" description={`Информация об OTP`} />
  </div>
);

const OtpForm = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const otp = useSelector<RootState, OtpState>(state => state.project.system.otp);
  const form = useForm<OtpState>({
    defaultValues: otp,
    mode: 'all',
    resolver: zodResolver(otpStateSchema),
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
          dispatch(setOtp(vals));
          form.reset(vals);
        }}
        onReset={(_, keepStateOptions) => {
          if (!keepStateOptions?.keepIsSubmitted) return;

          dispatch(setOtp(form.getValues()));
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

const OtpInner = () => {
  const formContext = useFormContext();
  const crc = useSelector<RootState, OtpState>(state => state.project.system.otp);

  const dispatch = useDispatch();
  return (
    <FormSticky
      onDefaultReset={() => {
        dispatch(setOtp(otpInitialState));
        formContext.reset(otpInitialState);
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

const Otp = () => (
  <OtpForm>
    <PeripheryWrapper title="Настройки OTP">
      <CommonSettings />
      <Form.Field name="read_mode" css={{ marginBottom: scale(2) }}>
        <Select
          label={
            <div css={{ display: 'flex', gap: scale(1) }}>
              <span>Режим чтения</span>
              <DetailsTrigger title="Режим чтения" description="Информация. TODO" />
            </div>
          }
          options={readModeOptions}
        />
      </Form.Field>
    </PeripheryWrapper>
    <FormUnsavedPrompt />
    <OtpInner />
  </OtpForm>
);

export default Otp;
