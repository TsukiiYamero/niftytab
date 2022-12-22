import { FormEvent, RefObject } from 'react';
import './login_layout.css';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { BsGoogle } from 'react-icons/bs';
import { FormHelperText } from '@mui/material';

type Props = {
    emailRef: RefObject<HTMLInputElement>;
    passwordRef: RefObject<HTMLInputElement>;
    errors: any,
    loading: boolean,
    errorMessage: string,
    pristine: boolean,
    title: string,
    isSignIn: boolean,
    onSignUp: () => void,
    onSignIn: () => void,
    onSubmit: () => void;
    googleSignIn: () => void
}

export const LoginLayout = ({
    emailRef, passwordRef, errors, loading,
    errorMessage, pristine, title, isSignIn,
    onSubmit, onSignUp, onSignIn, googleSignIn
}: Props) => {
    const onSubmitForm = (ev: FormEvent) => {
        ev.preventDefault();
        onSubmit();
    };

    const onClickGoogle = (ev: FormEvent) => {
        ev.preventDefault();
        googleSignIn();
    };

    const inputStyle = {
        boxShadow: 'var(--bg-color) 0 0 0 1000px inset',
        WebkitTextFillColor: 'var(--main-text-color)'
    };

    return (
        <div className={'container-login'}>
            <div>

                {loading && <h1>Loading...</h1>}

                <h2 className='title-login-space'>{title}</h2>

                <FormHelperText className={'error-msg-login'} >{errorMessage}</FormHelperText>

                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    width={'330px'}
                    className={'container-login-form'}
                >
                    <TextField
                        inputRef={emailRef}
                        id="login_Username"
                        error={errors.email && !pristine}
                        fullWidth
                        label="Username"
                        variant="outlined"
                        required
                        inputProps={{ style: inputStyle }}
                        helperText={errors.email && !pristine ? errors.email : ''}
                    />

                    <TextField
                        inputRef={passwordRef}
                        id="login_Password"
                        error={errors.email && !pristine}
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        required
                        inputProps={{ style: inputStyle }}
                        helperText={errors.password && !pristine ? errors.password : ''}
                    />

                    <Button
                        fullWidth
                        disabled={loading}
                        type='submit'
                        variant="contained"
                        onClick={onSubmitForm}
                    >{title}</Button>
                </Box>
            </div>

            <div className='bottom-login-container'>
                {isSignIn ? <FormHelperText className='forgot-msg-login'>Forgot your password?</FormHelperText> : null}

                <div className='login-social-media'>
                    <div className='line'>
                        <span>OR</span>
                    </div>

                    <div className='social-media-btns'>
                        <Button fullWidth variant="outlined" onClick={onClickGoogle} startIcon={<BsGoogle />}>
                            Continue with Google
                        </Button>
                    </div>

                    <div className='login-others-opts'>
                        {isSignIn
                            ? <span onClick={onSignUp}> Don&apos;t have an account yet?</span>
                            : <span onClick={onSignIn}> Already a user?</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};
