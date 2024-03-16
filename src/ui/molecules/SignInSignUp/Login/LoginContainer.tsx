import { useState } from 'react';
import { ForgotPasswordLayout } from '../ForgotPasswordLayout';
import { useAuthHandler } from '../useAuthHandler';
import { LoginForm } from './LoginForm';
import { Modal, useModal } from '@/ui/molecules/Modal';

export const LoginContainer = ({ isInitialSigIn = true }: { isInitialSigIn: boolean }) => {
    const [isSignIn, setIsSignIn] = useState(isInitialSigIn);

    const {
        isOpen: isOpenModalForgPass, openModal: openModalForgotPassword,
        closeModal: closeModalForgotPassword
    } = useModal();

    const {
        loading, errorMessage
    } = useAuthHandler(isSignIn);

    const forgotPassword = () => {
        openModalForgotPassword();
    };

    const toggleSignInSignUp = (signIn = true) => {
        setIsSignIn(signIn);
    };

    const onSubmit = () => {

    };

    return (
        <>
            <LoginForm
                isSignIn={isSignIn}
                loading={loading}
                errorMessage={errorMessage}
                onSubmit={onSubmit}
                toggleSignInSignUp={toggleSignInSignUp}
                onForgotPassword={forgotPassword}
            />

            <Modal
                isOpen={isOpenModalForgPass}
                onClose={closeModalForgotPassword}
                closeByClickOutside={false}
                displayLevel={2}
            >
                <ForgotPasswordLayout />
            </Modal>
        </>
    );
};
