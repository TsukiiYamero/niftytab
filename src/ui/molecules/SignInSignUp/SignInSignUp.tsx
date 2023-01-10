import { startSignUpWithEmail, useAuthDispatch, useAuthState } from '@/contexts/auth';
import { useFormAdvanced } from '@/customHooks/useFormAdvanced';
import { useModalContext } from '@/ui/molecules/Modal';
import { authValidationsBasic } from '@/utils/authValidations';
import { useEffect, useRef, useState } from 'react';
import { LoginLayout } from './LoginLayout';
import { startSignInWithEmail } from '@/contexts/auth/thunks/signInWithEmail';
import { signInWithGoogle } from '@/services/authProviders';

type SignUpForm = { email: string, password: string }

export const SignInSignUp = ({ signIn = true }: { signIn: boolean }) => {
    const [isSignIn, setIsSignIn] = useState(signIn);
    const { loading, errorMessage } = useAuthState();
    const { closeModal } = useModalContext();
    const dispatch = useAuthDispatch();

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
        const signUp = async () => {
            if (!isValid) return;

            if (!data?.email || !data?.password) return;

            const userCredentials = {
                email: data?.email,
                password: data?.password
            };

            let isOk = false;

            signIn
                ? isOk = await startSignInWithEmail(dispatch, userCredentials)
                : isOk = await startSignUpWithEmail(dispatch, userCredentials);

            isOk && closeModal();
        };
        signUp();
    }, [isValid, data, dispatch, closeModal, signIn]);

    const onSubmit = () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        handelSetData({
            email, password
        });
    };

    const onSignInWithGoogle = async () => {
        await signInWithGoogle();
        // getIdentityGoogle();
    };

    const onSignIn = () => {
        setIsSignIn(true);
    };

    const onSignUp = () => {
        setIsSignIn(false);
    };

    return <LoginLayout
        title={isSignIn ? 'SIGN IN' : 'Create Account'}
        isSignIn={isSignIn}
        loading={loading}
        emailRef={emailRef}
        passwordRef={passwordRef}
        pristine={pristine}
        errors={errors}
        errorMessage={errorMessage}
        onSubmit={onSubmit}
        googleSignIn={onSignInWithGoogle}
        onSignIn={onSignIn}
        onSignUp={onSignUp}
    />;
};
