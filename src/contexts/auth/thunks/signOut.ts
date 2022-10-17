import { signOut } from '@/services/authProviders';
import { Dispatch } from 'react';
import { AuthActions, AuthActionType } from '../auth.types';

export const startSignOut = async (dispatch: Dispatch<AuthActionType>) => {
    dispatch({ type: AuthActions.requestLogin });

    try {
        await signOut();
    } catch (error) {
        dispatch({ type: AuthActions.loginError, payload: 'Something went wrong, please try again later.' });
    }

    dispatch({ type: AuthActions.logout });
    return true;
};
