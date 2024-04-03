import { signOut } from '@/services/authProviders';
import { AuthActions } from '../auth.types';
import { useAuthDispatch } from '../hooks';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogOut = () => {
    const authDispatch = useAuthDispatch();
    const navigateTo = useNavigate();

    const logOut = useCallback(async () => {
        authDispatch({ type: AuthActions.requestLogin });

        try {
            await signOut();
        } catch (error) {
            authDispatch({ type: AuthActions.loginError, payload: 'Something went wrong, please try again later.' });
        }

        authDispatch({ type: AuthActions.logout });

        navigateTo('/tabs');
    }, []);

    return logOut;
};
