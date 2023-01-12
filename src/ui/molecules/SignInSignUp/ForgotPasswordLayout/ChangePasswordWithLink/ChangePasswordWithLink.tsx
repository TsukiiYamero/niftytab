import { useFormAdvanced } from '@/customHooks/useFormAdvanced';
import { recoveryPasswordValidation } from '@/utils';
import { Box, TextField, Button } from '@mui/material';
import { FormEvent, useEffect, useRef } from 'react';

type Props = {}

export const ChangePasswordWithLink = (props: Props) => {
    const linkRecoveryRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);

    const { data, errors, isValid, pristine, handelSetData } = useFormAdvanced<{ link: string, newPassword: string }>({
        validations: recoveryPasswordValidation.validations,
        initialValues: {
            link: linkRecoveryRef.current?.value,
            newPassword: newPasswordRef.current?.value
        }
    });

    useEffect(() => {
        if (isValid) {
            console.log(data, 'Ahora verificar el link y si si cambiar la contrasenia');
        }
    }, [isValid, data]);

    const onChangePassword = (formEv: FormEvent) => {
        formEv.preventDefault();

        handelSetData({
            link: linkRecoveryRef.current?.value ?? '',
            newPassword: newPasswordRef.current?.value ?? ''
        });
    };

    return (
        <>
            <h3>Change Password</h3>

            <Box component={'form'}>
                {/* To avoid autocomplete the link recovery from browsers */}
                <input type="password" name='fake-link' autoComplete='new-password' tabIndex={-1} style={{
                    height: '0',
                    width: '0',
                    zIndex: '-1',
                    position: 'absolute'
                }} />

                <TextField
                    id="link_recovery"
                    fullWidth
                    label="Link recovery"
                    variant="outlined"
                    type="text"
                    required
                    autoComplete='off'
                    inputRef={linkRecoveryRef}
                    error={!!errors.link && !pristine}
                    helperText={errors.link && !pristine ? errors.link : ''}
                />

                <Box>
                    <TextField
                        id="login_reset-password"
                        fullWidth
                        label="New Password"
                        variant="outlined"
                        type="password"
                        required
                        autoComplete='off'
                        inputRef={newPasswordRef}
                        error={!!errors.newPassword && !pristine}
                        helperText={errors.newPassword && !pristine ? errors.newPassword : ''}
                    />

                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={onChangePassword}
                >
                    Change Password
                </Button>
            </Box>
        </>
    );
};
