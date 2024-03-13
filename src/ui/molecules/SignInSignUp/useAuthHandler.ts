import { startSignUpWithEmail, useAuthDispatch, useAuthState } from '@/contexts/auth';
import { useModalContext } from '@/ui/molecules/Modal';
import { startSignInWithEmail } from '@/contexts/auth/thunks/signInWithEmail';
import { AuthActions } from '@/contexts/auth/auth.types';

export const useAuthHandler = (isSignIn: boolean) => {
    const { loading, errorMessage } = useAuthState();
    const { closeModal } = useModalContext();

    const dispatch = useAuthDispatch();

    const signUp = async ({ email, password }: { email: string, password: string }) => {
        const userCredentials = { email, password };

        let isLoginSuccessful = false;

        isSignIn
            ? isLoginSuccessful = await startSignInWithEmail(dispatch, userCredentials)
            : isLoginSuccessful = await startSignUpWithEmail(dispatch, userCredentials);

        isLoginSuccessful && closeModal();
    };

    const onSignIn = () => {
        resetLoginData();
    };

    const onSignUp = () => {
        resetLoginData();
    };

    const resetLoginData = async () => {
        dispatch({ type: AuthActions.resetMsg });
    };

    return {
        loading,
        errorMessage,
        onSignIn,
        onSignUp,
        signUp
    };
};
