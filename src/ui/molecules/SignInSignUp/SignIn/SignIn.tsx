import { startSignInWithEmail } from '@/contexts/auth/thunks/signInWithEmail';
import { useAuthDispatch, useAuthState } from '@/contexts/auth';
import { useFormAdvanced } from '@/customHooks/useFormAdvanced';
import { useModalContext } from '@/ui/molecules/Modal';
import { authValidationsBasic } from '@/utils/authValidations';
import { useEffect, useRef } from 'react';
import { LoginLayout } from '../LoginLayout/LoginLayout';

type SignUpForm = { email: string, password: string }

export const SignIn = () => {
    const dispatch = useAuthDispatch();
    const { loading, errorMessage } = useAuthState();
    const { closeModal } = useModalContext();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { data, errors, isValid, pristine, handelSetData } = useFormAdvanced<SignUpForm>({
        ...authValidationsBasic,
        initialValues: {
            email: emailRef.current?.value ?? '',
            password: passwordRef.current?.value ?? ''
        }
    });

    useEffect(() => {
        const signIn = async () => {
            if (!isValid) return;

            if (!data?.email || !data?.password) return;

            const userCredentials = {
                email: data.email,
                password: data.password
            };

            const isOK = await startSignInWithEmail(dispatch, userCredentials);
            isOK && closeModal();
        };

        signIn();
    }, [isValid, data, dispatch, closeModal]);

    const onSignIn = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        handelSetData({ email, password });
    };

    return <LoginLayout
        title={'Sign In'}
        loading={loading}
        emailRef={emailRef}
        passwordRef={passwordRef}
        pristine={pristine}
        errors={errors}
        errorMessage={errorMessage}
        onSubmit={onSignIn}
    />;
};
