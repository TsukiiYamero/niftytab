/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redeclare */
import { useHandlePassword } from '@/customHooks/forms/useHandlePassword';
import './login_layout.css';
/* import { type FormEvent, useState } from 'react'; */
import { useForm } from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';
/* import { PatternPassword } from '@/utils'; */
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { PatternPassword } from '@/utils';

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

    const title = isSignIn ? 'Sign In' : 'Create Account';

    const { isVisible, togglePassword } = useHandlePassword();

    return (
        <div className={'px-[16px] py-[16px] max-w-[380px]'}>
            <div>

                {loading && <h1>Loading...</h1>}

                <h2 className='text-[length:var(--font-size-title)] mb-5'>{title}</h2>

                <p className={'error-msg-login'} >{errorMessage}</p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className={'flex flex-col gap-5'}
                >
                    <Input
                        size={'md'}
                        type="email"
                        label="Email"
                        variant="bordered"
                        fullWidth
                        isInvalid={!!errors.email}
                        color={errors.email ? 'danger' : 'success'}
                        errorMessage={errors.email?.message}
                        {...register('email', {
                            required: 'Please Provide an email',
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Please enter a valid email'
                            }
                        })}
                    />

                    <Input
                        size='md'
                        label="Password"
                        variant="bordered"
                        fullWidth
                        isInvalid={!!errors.password}
                        color={errors.password ? 'danger' : 'success'}
                        errorMessage={errors.password?.message}
                        type={isVisible ? 'text' : 'password'}
                        {...register('password', {
                            required: 'Please Provide a password',
                            pattern: {
                                value: PatternPassword,
                                message: 'Password must be at least 8 characters long, and must include 1 letter & 1 number.'
                            }
                        })}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={togglePassword}>
                                {
                                    isVisible
                                        ? (
                                            <IconEyeOff className="text-2xl text-default-400 pointer-events-none" />
                                        )
                                        : (
                                            <IconEye className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                            </button>
                        }
                    />

                    <Button
                        fullWidth
                        color='primary'
                        disabled={loading}
                        type='submit'
                        variant="solid"
                        className='mt-2'
                    >{title}</Button>
                </form>

            </div>

            <div className='pt-[11px]'>
                {
                    isSignIn
                        ? <p onClick={onForgotPassword} className='forgot-msg-login'>Forgot your password?</p>
                        : (
                            <div className='tos-privacy text-font-size-small'>
                                <p>
                                    By clicking&quot;Create account&quot;, I agree to NiftyTab&quot;s
                                </p>
                                <a className='pl-1' href={'https://niftytab.netlify.app/terms#termsSection'} target='_blank' rel="noreferrer">TOS</a> and
                                <a className='pl-1' href={'https://niftytab.netlify.app/privacy#termsSection'} target='_blank' rel="noreferrer">Privacy Policy</a>.
                            </div>
                        )
                }

                <div className='login-social-media'>
                    <div className='custom-line'>
                        <span>Or</span>
                    </div>

                    <div className='login-others-opts'>
                        {isSignIn
                            ? <span className='underline text-[length:var(--font-size-common)]' onClick={onSignUp}> Don&apos;t have an account yet?</span>
                            : <span className='underline text-[length:var(--font-size-common)]' onClick={onSignIn}> Already a user?</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};
