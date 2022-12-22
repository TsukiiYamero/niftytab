
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { FormEvent, RefObject } from 'react';

import './login_layout.css';
import { FormHelperText } from '@mui/material';

type Props = {
    emailRef: RefObject<HTMLInputElement>;
    passwordRef: RefObject<HTMLInputElement>;
    onSubmit: () => void;
    errors: any,
    loading: boolean,
    errorMessage: string,
    pristine: boolean,
    title: string
}

export const FormDesign = ({
    emailRef, passwordRef, onSubmit, errors,
    loading, errorMessage, pristine, title
}: Props) => {
    const onSubmitForm = (ev: FormEvent) => {
        ev.preventDefault();
        onSubmit();
    };
    const inputStyle = {
        boxShadow: 'var(--bg-color) 0 0 0 1000px inset',
        WebkitTextFillColor: 'var(--main-text-color)'
    };
    return (
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

    );
};
