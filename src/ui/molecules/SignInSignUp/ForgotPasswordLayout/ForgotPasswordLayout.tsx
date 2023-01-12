import { useFormAdvanced } from '@/customHooks/useFormAdvanced';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useRef, useState, FormEvent } from 'react';
import { EmailValidation } from '@/utils/authValidations';
import { ChangePasswordWithLink } from './ChangePasswordWithLink/ChangePasswordWithLink';
import './forgot_password_layout.css';

export const ForgotPasswordLayout = () => {
  const [haveUrl, setHaveUrl] = useState(false);
  // const showSnackbar = useSnackbar();
  const [disableBtn, setDisableBtn] = useState(false);
  const emailRecoveryRef = useRef<HTMLInputElement>(null);

  const { data, errors, isValid, pristine, handelSetData } = useFormAdvanced<{ email: string }>({
    validations: EmailValidation.validations,
    initialValues: {
      email: emailRecoveryRef.current?.value ?? ''
    }
  });

  useEffect(() => {
    if (isValid) {
      setDisableBtn(true);
      // showSnackbar('Recovery Link sent successfully', 'success');
    }
  }, [setDisableBtn, data, isValid]);

  const onAlreadyHaveUrl = () => {
    setHaveUrl(!haveUrl);
  };

  const onSendRecoveryLink = (formEv: FormEvent) => {
    formEv.preventDefault();
    const email = emailRecoveryRef.current?.value;

    handelSetData({ email });
  };

  return (
    <div className="forgot-password-container">
      {
        !haveUrl
          ? <>
            <h3>Recovery Password</h3>

            <Box
              component="form"
              noValidate
            >
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

            <div className='custom-line'>
              <span>Or</span>
            </div>

            <div className='login-others-opts'>
              {!haveUrl ? <span onClick={onAlreadyHaveUrl}> Already have a recovery link?</span> : null}
            </div>
          </>
          : <ChangePasswordWithLink />
      }
    </div>
  );
};
