import { startSignUpWithEmail, useAuthDispatch, useAuthState } from '@/contexts/auth';
import { useFormAdvanced } from '@/customHooks/useFormAdvanced';
import { Modal, useModal, useModalContext } from '@/ui/molecules/Modal';
import { authValidationsBasic } from '@/utils/authValidations';
import { useEffect, useRef, useState } from 'react';
import { LoginLayout } from './LoginLayout';
import { startSignInWithEmail } from '@/contexts/auth/thunks/signInWithEmail';
import { signInWithGoogle } from '@/services/authProviders';
import { ForgotPasswordLayout } from './ForgotPasswordLayout';
import { AuthActions } from '@/contexts/auth/auth.types';

type SignUpForm = { email: string, password: string }

export const SignInSignUp = ({ signIn = true }: { signIn: boolean }) => {
    const [isSignIn, setIsSignIn] = useState(signIn);
    const { loading, errorMessage } = useAuthState();
    const { closeModal } = useModalContext();
    const { isOpen, openModal: openModalForgotPassword, closeModal: closeModalForgotPassword } = useModal();
    const dispatch = useAuthDispatch();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { data, errors, isValid, pristine, handelSetData, resetForm } = useFormAdvanced<SignUpForm>({
        validations: authValidationsBasic.validations,
        initialValues: {
            email: emailRef.current?.value ?? '',
            password: passwordRef.current?.value ?? ''
        }
    });

    useEffect(() => {
        const signUp = async () => {
            if (!isValid) return;

            const userCredentials = {
                email: data.email ?? '',
                password: data.password ?? ''
            };

            let isOk = false;

            isSignIn
                ? isOk = await startSignInWithEmail(dispatch, userCredentials)
                : isOk = await startSignUpWithEmail(dispatch, userCredentials);

            isOk && closeModal();
        };
        signUp();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isValid, data, dispatch, closeModal]);

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
        resetLoginData();
        setIsSignIn(true);
    };

    const onSignUp = () => {
        resetLoginData();
        setIsSignIn(false);
    };

    const resetLoginData = async () => {
        if (emailRef.current)
            emailRef.current.value = '';
        if (passwordRef.current)
            passwordRef.current.value = '';

        resetForm();
        dispatch({ type: AuthActions.resetMsg });
    };

    const forgotPassword = () => {
        openModalForgotPassword();
    };

    return (
        <>
            <LoginLayout
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
                forgotPassword={forgotPassword}
            />

            <Modal
                isOpen={isOpen}
                onClose={closeModalForgotPassword}
                closeByClickOutside={false}
                displayLevel={2}
                ClassSizeAuto={true}
            >
                <ForgotPasswordLayout />
            </Modal>
        </>
    );
};
