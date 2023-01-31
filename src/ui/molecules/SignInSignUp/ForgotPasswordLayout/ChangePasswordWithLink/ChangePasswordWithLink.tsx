/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLogOut } from '@/contexts/auth/thunks/useLogout';
import { useSnackbar } from '@/contexts/snackbar/hooks';
import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { useFormAdvanced } from '@/customHooks/useFormAdvanced';
import { setSessionByToken, updateProfile } from '@/services/authProviders';
import { recoveryPasswordValidation } from '@/utils';
import { Box, TextField, Button } from '@mui/material';
import { FormEvent, IframeHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ChangePasswordWithLink = () => {
    const { callApi: fetchChangePassword } = useFetchWithCallback();
    const { callApi } = useFetchWithCallback();
    const showSnackbar = useSnackbar();
    const logOut = useLogOut();
    const navigate = useNavigate();
    const [linkToValidate, setLinkToValidate] = useState('');
    const linkRecoveryRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const iframeRef = useRef<any>(null);

    const { data, errors, isValid, pristine, handelSetData } = useFormAdvanced<{ link: string, newPassword: string }>({
        validations: recoveryPasswordValidation.validations,
        initialValues: {
            link: linkRecoveryRef.current?.value,
            newPassword: newPasswordRef.current?.value
        }
    });

    useEffect(() => {
        if (!isValid) return;

        const verifyCode = async () => {
            const urlWithToken = new URL(data.link ?? '');
            const token = new URLSearchParams(data.link?.split('#')[1]).get('access_token');
            console.log(token, data.link, urlWithToken);
            setLinkToValidate(urlWithToken.href);

            // validate rgx
            if (!data.link) return;

            const newLink = data.link.replace('to=', 'to=chrome-extension://');
            console.log(newLink);
            window.location.href = newLink;
            /* const { error: errorInSession } = await callApi(setSessionByToken, token);
            if (errorInSession) return; */
            // showSnackbar('Password changed successfully, please login', 'success');
        };

        verifyCode();

        return () => {
            logOut();
        };
    }, [isValid, data, callApi, fetchChangePassword, logOut, showSnackbar]);

    const onChangePassword = (formEv: FormEvent) => {
        formEv.preventDefault();

        handelSetData({
            link: linkRecoveryRef.current?.value ?? '',
            newPassword: newPasswordRef.current?.value ?? ''
        });
    };

    const onLoadIframe = async () => {
        if (!linkToValidate) return;
        console.log('ya?');
        /* const token = localStorage.getItem('sb-mwneagqiuxzbkgsfkkio-auth-token');
        console.log('cookie', token); */
        /* const { error: errorInChangePassword } = await fetchChangePassword(updateProfile, { password: data.newPassword });

        if (errorInChangePassword) return;

        await logOut();
        showSnackbar('Password changed successfully, please login', 'success'); */
    };

    return (
        <>
            <h3>Change Password</h3>
            {/* I need to open the link and the get the new url with the tokken */}
            {/*  <iframe ref={iframeRef} src={linkToValidate} onLoad={onLoadIframe} width={350} height={190}></iframe> */}

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
