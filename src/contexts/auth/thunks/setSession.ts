import { AuthError, Session } from '@supabase/supabase-js';
import { Dispatch } from 'react';
import { AuthActions, AuthActionType, AuthLoginData } from '../auth.types';

/**
 * Set session in the system and if successful, it will dispatch
 * a login success action with the user's data.
 * @param dispatch - Dispatch<AuthActionType>
 * @param result - UserCredentials
 */
type AuthResponseSession = {
    data: {
        session: Session;
    };
    error: null;
} | {
    data: {
        session: null;
    };
    error: AuthError;
} | {
    data: {
        session: null;
    };
    error: null;
}

export const startSetSession = async (dispatch: Dispatch<AuthActionType>, result: AuthResponseSession) => {
    if (result.error) {
        dispatch({ type: AuthActions.loginError, payload: result.error.message });
        return false;
    }

    const sessionData = result.data.session;

    if (!sessionData) {
        dispatch({ type: AuthActions.loginError, payload: 'Credentials not found.' });
        return false;
    }

    const authLoginData: AuthLoginData = {
        user: {
            avatarUrl: sessionData.user.user_metadata?.avatar_url ?? '',
            email: sessionData.user.email ?? '',
            fullName: sessionData.user.user_metadata?.full_name ?? '',
            id: sessionData.user.id
        },
        token: sessionData.access_token
    };

    dispatch({ type: AuthActions.loginSuccess, payload: authLoginData });

    return true;
};
