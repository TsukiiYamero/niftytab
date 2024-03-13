/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redeclare */
import { useHandlePassword } from '@/customHooks/forms/useHandlePassword';
import './login_layout.css';
/* import { type FormEvent, useState } from 'react'; */
import { useForm } from 'react-hook-form';
/* import { PatternPassword } from '@/utils'; */

type Props = {
    loading: boolean,
    errorMessage: string,
    isSignIn: boolean,
    onSignUp: () => void,
    onSignIn: () => void,
    onSubmit: () => void;
    onForgotPassword: () => void,
}

export const LoginForm = ({
    loading, errorMessage,
    isSignIn, onSubmit, onSignUp,
    onSignIn, onForgotPassword
}: Props) => {
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const { showPassword, handleClickShowPassword } = useHandlePassword();

    return (
        <div className={'container-login'}>
            <div>

                {loading && <h1>Loading...</h1>}

                <h2 className='title-login-space'>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>

                {/* <FormHelperText className={'error-msg-login'} >{errorMessage}</FormHelperText>

                <Box
                    component="form"
                    noValidate
                    width={'330px'}
                    className={'container-login-form'}
                >
                    <TextField
                        id="login_Email"
                        error={!!errors.email}
                        fullWidth
                        label="Email"
                        variant="outlined"
                        required
                        {...register('email', {
                            required: 'Please Provide an email',
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Please enter a valid email'
                            }
                        })}
                        helperText={errors.email?.message}
                    />

                    <FormControl fullWidth variant="outlined">
                        <InputLabel error={!!errors.password} htmlFor="outlined-adornment-login_Password">Password</InputLabel>
                        <OutlinedInput
                            fullWidth
                            error={!!errors.password}
                            {...register('password', {
                                required: 'Please Provide a password',
                                pattern: {
                                    value: PatternPassword,
                                    message: 'Password must be at least 8 characters long, and must include 1 letter & 1 number.'
                                }
                            })}
                            id="outlined-adornment-login_Password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        <FormHelperText error={!!errors.password}>{errors.password?.message}</FormHelperText>
                    </FormControl>

                    <Button
                        fullWidth
                        disabled={loading}
                        type='submit'
                        variant="contained"
                        onClick={onSubmitForm}
                    >{title}</Button>
                </Box> */}

            </div>

            <div className='bottom-login-container'>
                {/*  {
                    isSignIn
                        ? <FormHelperText onClick={onForgotPassword} className='forgot-msg-login'>Forgot your password?</FormHelperText>
                        : (
                            <Box className='tos-privacy'>
                                <FormHelperText>
                                    By clicking "Create account", I agree to NiftyTab's
                                </FormHelperText>
                                <FormHelperText>
                                    <a href={'https://niftytab.netlify.app/terms#termsSection'} target='_blank' rel="noreferrer">TOS</a> and
                                    <a href={'https://niftytab.netlify.app/privacy#termsSection'} target='_blank' rel="noreferrer">Privacy Policy</a>.
                                </FormHelperText>
                            </Box>
                        )
                } */}

                <div className='login-social-media'>
                    <div className='custom-line'>
                        <span>Or</span>
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
