import { startSignUpWithEmail, useAuthDispatch, useAuthState } from '@/contexts/auth';
import { useModal, useModalContext } from '@/ui/molecules/Modal';
import { startSignInWithEmail } from '@/contexts/auth/thunks/signInWithEmail';
import { signInWithGoogle } from '@/services/authProviders';
import { AuthActions } from '@/contexts/auth/auth.types';
import { useForm } from 'react-hook-form';

export const useAuthHandler = (isSignIn: boolean) => {
    const { loading, errorMessage } = useAuthState();
    const { closeModal } = useModalContext();
    const { isOpen: isOpenModalForgPass, openModal: openModalForgotPassword, closeModal: closeModalForgotPassword } = useModal();
    const dispatch = useAuthDispatch();

    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const signUp = async () => {
        const { email, password } = getValues();
        const userCredentials = { email, password };

        let isLoginSuccessful = false;

        isSignIn
            ? isLoginSuccessful = await startSignInWithEmail(dispatch, userCredentials)
            : isLoginSuccessful = await startSignUpWithEmail(dispatch, userCredentials);

        isLoginSuccessful && closeModal();
    };

    const onSignInWithGoogle = async () => {
        await signInWithGoogle();
        // getIdentityGoogle();
    };

    const onSignIn = () => {
        resetLoginData();
    };

    const onSignUp = () => {
        resetLoginData();
    };

    const resetLoginData = async () => {
        reset();
        dispatch({ type: AuthActions.resetMsg });
    };

    const forgotPassword = () => {
        openModalForgotPassword();
    };

    return {
        loading,
        errorMessage,
        register,
        handleSubmit,
        getValues,
        errors,
        onSubmit: handleSubmit(signUp),
        googleSignIn: onSignInWithGoogle,
        onSignIn,
        onSignUp,
        forgotPassword,
        isOpenModalForgPass,
        closeModalForgotPassword
    };
};
