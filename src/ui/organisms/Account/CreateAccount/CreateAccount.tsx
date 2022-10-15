import { useAuthDispatch, useAuthState } from '@/contexts/auth';
import { startSignUpWithEmail } from '@/contexts/auth/thunks/signUpWithEmail';
import { useFormAdvanced } from '@/customHooks/useFormAdvanced';
import { StandardButton } from '@/ui/atoms/Buttons';
import { FormEvent, useEffect, useRef } from 'react';

type SignUpForm = { email: string, password: string, passwordRepeat: string }

const validations = {
    validations: {
        email: {
            pattern: {
                // eslint-disable-next-line
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Please enter a valid email address.'
            }
        },
        password: {
            pattern: {
                // eslint-disable-next-line
                value: /^(?=.*[A-Za-z])(?=.*\d){8,}/,
                message: 'Password must be at least 8 characters long & contain one letter & one number'
            }
        },
        passwordRepeat: {
            custom: {
                isValid: (value: SignUpForm) => value.password === value.passwordRepeat,
                message: 'Both password should be the same.'
            }
        }
    }
};

const CreateAccount = () => {
    const dispatch = useAuthDispatch();
    const { loading, errorMessage } = useAuthState();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordRepeatRef = useRef<HTMLInputElement>(null);

    const { data, errors, isValid, pristine, handelSetData } = useFormAdvanced<SignUpForm>({
        ...validations,
        initialValues: {
            email: emailRef.current?.value ?? '',
            password: passwordRef.current?.value ?? '',
            passwordRepeat: passwordRepeatRef.current?.value ?? ''
        }
    });

    const onHandleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const passwordRepeat = passwordRepeatRef.current?.value

        handelSetData({
            email, password, passwordRepeat
        });
    };

    useEffect(() => {
        if (!isValid) return;

        if (!data?.email || !data?.password) return;

        const userCredentials = {
            email: data?.email,
            password: data?.password
        };

        startSignUpWithEmail(dispatch, userCredentials);
    }, [isValid, data, dispatch]);

    return (
        <div>

            {loading && <h1>Loading...</h1>}
            {errorMessage && <p>{errorMessage}</p>}

            <div className="">
                <h2>Create Account</h2>

                {!pristine && errors.email && <span>{errors.email}</span>}
                {!pristine && errors.password && <span>{errors.password}</span>}
                {!pristine && errors.passwordRepeat && <span>{errors.passwordRepeat}</span>}

                <form onSubmit={onHandleSubmit}>
                    <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        name="password"
                        placeholder="********"
                    />
                    <input
                        ref={passwordRepeatRef}
                        type="password"
                        name="passwordRepeat"
                        placeholder="********"
                    />

                    <StandardButton
                        buttonStyle="btn-primary"
                        text={'Sign In'}
                        type="submit"
                        onClick={() => { }}
                    />
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;
