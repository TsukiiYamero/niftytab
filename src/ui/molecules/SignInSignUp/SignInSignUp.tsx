import { Modal } from '@/ui/molecules/Modal';
import { useState } from 'react';
import { LoginLayout } from './LoginLayout';
import { ForgotPasswordLayout } from './ForgotPasswordLayout';
import { useAuthHandler } from './useAuthHandler';

export const SignInSignUp = ({ signIn = true }: { signIn: boolean }) => {
    const [isSignIn, setIsSignIn] = useState(signIn);
    const {
        loading, errorMessage, register, onSubmit,
        errors, googleSignIn, onSignIn, forgotPassword, closeModalForgotPassword,
        isOpenModalForgPass
    } = useAuthHandler(isSignIn);

    const toggleSignInSignUp = () => {
        setIsSignIn(!isSignIn);
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
                onSubmit={onSubmit}
                googleSignIn={googleSignIn}
                onSignIn={onSignIn}
                onSignUp={toggleSignInSignUp}
                forgotPassword={forgotPassword}
            />

            <Modal
                isOpen={isOpenModalForgPass}
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
