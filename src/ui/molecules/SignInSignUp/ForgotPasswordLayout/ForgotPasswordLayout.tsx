import { useFormAdvanced } from '@/customHooks/useFormAdvanced';
import { Box, Button, FormHelperText, TextField } from '@mui/material';
import { useEffect, useRef, useState, FormEvent } from 'react';
import { EmailValidation } from '@/utils/authValidations';
import { useSnackbar } from '@/contexts/snackbar/hooks';
import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { resetPassword } from '@/services/authProviders';
import './forgot_password_layout.css';

export const ForgotPasswordLayout = () => {
  const [timeToRetry, setTimeToRetry] = useState('');
  const showSnackbar = useSnackbar();
  const { callApi } = useFetchWithCallback();
  const [disableBtn, setDisableBtn] = useState(false);
  const emailRecoveryRef = useRef<HTMLInputElement>(null);

  const { data, errors, isValid, pristine, handelSetData } = useFormAdvanced<{ email: string }>({
    validations: EmailValidation.validations,
    initialValues: {
      email: emailRecoveryRef.current?.value ?? ''
    }
  });

  useEffect(() => {
    if (!isValid) return;

    const timeForAllowRecovery = localStorage.getItem('time_re');
    if (timeForAllowRecovery) {
      const actualTime = new Date();

      if (Number(timeForAllowRecovery) > actualTime.getTime()) {
        const timeAllowed = new Date(Number(timeForAllowRecovery));
        const timeToShow = `${timeAllowed.getHours()}:${timeAllowed.getMinutes()}`;
        setTimeToRetry(`Try again after ${timeToShow}`);
        return;
      };
    }

    const timeForRetryLink = new Date();
    const timeToSave = timeForRetryLink.setSeconds(timeForRetryLink.getSeconds() + 35);
    localStorage.setItem('time_re', `${timeToSave}`);

    setTimeToRetry('');
    setDisableBtn(true);

    const sendEmailRecovery = async () => {
      const { data, error } = await callApi(resetPassword, emailRecoveryRef?.current?.value ?? '');

      if (error) return;

      showSnackbar('Recovery Link sent successfully', 'success');
      console.log(data, error);
    };

    sendEmailRecovery();
  }, [setDisableBtn, showSnackbar, callApi, data, isValid]);

  const onSendRecoveryLink = (formEv: FormEvent) => {
    formEv.preventDefault();
    const email = emailRecoveryRef.current?.value;
    handelSetData({ email });
  };

  return (
    <div className="forgot-password-container">
      <h3>Recovery Password</h3>

      <Box
        component="form"
        noValidate
      >
        {
          timeToRetry ? <FormHelperText>{timeToRetry}</FormHelperText> : null
        }
        <TextField
          inputRef={emailRecoveryRef}
          id="email_recovery"
          error={!!errors.email && !pristine}
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          required
          helperText={errors.email && !pristine ? errors.email : ''}
        />
        <Button
          fullWidth
          disabled={disableBtn}
          type='submit'
          variant="contained"
          onClick={onSendRecoveryLink}
        >Send Recovery Link</Button>
      </Box>
    </div>
  );
};
