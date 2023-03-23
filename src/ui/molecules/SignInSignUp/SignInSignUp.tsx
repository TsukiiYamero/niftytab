import { startSignUpWithEmail, useAuthDispatch, useAuthState } from '@/contexts/auth';
import { Modal, useModal, useModalContext } from '@/ui/molecules/Modal';
import { useState } from 'react';
import { LoginLayout } from './LoginLayout';
import { startSignInWithEmail } from '@/contexts/auth/thunks/signInWithEmail';
import { signInWithGoogle } from '@/services/authProviders';
import { ForgotPasswordLayout } from './ForgotPasswordLayout';
import { AuthActions } from '@/contexts/auth/auth.types';
import { useForm } from 'react-hook-form';

export const SignInSignUp = ({ signIn = true }: { signIn: boolean }) => {
    const [isSignIn, setIsSignIn] = useState(signIn);
    const { loading, errorMessage } = useAuthState();
    const { closeModal } = useModalContext();
    const { isOpen, openModal: openModalForgotPassword, closeModal: closeModalForgotPassword } = useModal();
    const dispatch = useAuthDispatch();

    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const signUp = async () => {
        const { email, password } = getValues();

        const userCredentials = {
            email,
            password
        };

        let isOk = false;

        isSignIn
            ? isOk = await startSignInWithEmail(dispatch, userCredentials)
            : isOk = await startSignUpWithEmail(dispatch, userCredentials);

        isOk && closeModal();
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
        reset();
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
                register={register}
                errors={errors}
                errorMessage={errorMessage}
                onSubmit={handleSubmit(signUp)}
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
