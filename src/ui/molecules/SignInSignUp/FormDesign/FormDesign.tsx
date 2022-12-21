
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { FormEvent, RefObject } from 'react';

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
    return (
        <div>

            {loading && <h1>Loading...</h1>}
            {errorMessage && <p>{errorMessage}</p>}

            <h2>{title}</h2>

            {!pristine && errors.email && <span>{errors.email}</span>}
            {!pristine && errors.password && <span>{errors.password}</span>}

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' }
                }}
                noValidate
                autoComplete="off"
            >
                <TextField ref={emailRef} id="login_Username" label="Username" variant="outlined" required />
                <TextField ref={passwordRef} id="login_Password" label="Password" variant="outlined" type="password" required />
                <Button type='submit' variant="contained" onClick={onSubmitForm} >{title}</Button>
            </Box>

        </div>

    );
};
