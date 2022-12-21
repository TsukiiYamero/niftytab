import { startSignUpWithEmail, useAuthDispatch, useAuthState } from '@/contexts/auth';
import { useFormAdvanced } from '@/customHooks/useFormAdvanced';
import { StandardButton } from '@/ui/atoms/Buttons';
import { useModalContext } from '@/ui/molecules/Modal';
import { authValidations } from '@/utils/authValidations';
import { FormEvent, useEffect, useRef } from 'react';

type SignUpForm = { email: string, password: string, passwordRepeat: string }

export const CreateAccount = () => {
    const dispatch = useAuthDispatch();
    const { loading, errorMessage } = useAuthState();
    const { closeModal } = useModalContext();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordRepeatRef = useRef<HTMLInputElement>(null);

    const { data, errors, isValid, pristine, handelSetData } = useFormAdvanced<SignUpForm>({
        ...authValidations,
        initialValues: {
            email: emailRef.current?.value ?? '',
            password: passwordRef.current?.value ?? '',
            passwordRepeat: passwordRepeatRef.current?.value ?? ''
        }
    });

    useEffect(() => {
        const signUp = async () => {
            if (!isValid) return;

            if (!data?.email || !data?.password) return;

            const userCredentials = {
                email: data?.email,
                password: data?.password
            };

            const isOk = await startSignUpWithEmail(dispatch, userCredentials);
            isOk && closeModal();
        };
        signUp();
        // problem the method is rerender too many times
    }, [isValid, data, dispatch, closeModal]);

    const onHandleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const passwordRepeat = passwordRepeatRef.current?.value;

        handelSetData({
            email, password, passwordRepeat
        });
    };

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
