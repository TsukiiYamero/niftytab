import type { Dispatch } from 'react';
import { AuthActions } from '../auth.types';
import type { AuthActionType, AuthLoginData } from '../auth.types';
import type { AuthError, Session } from '@supabase/supabase-js';

/* si esta bien mandar el dispatch a una funcion normalita, is okay */

type AuthResponseSession = {
    data: {
        session: Session | null;
    };
    error: AuthError | null;
}

/**
 * Set user session in the authContext
 * @param dispatch - Dispatch<AuthActionType>
 * @param result - UserCredentials
 */
export const startSetSession = async (dispatch: Dispatch<AuthActionType>, result: AuthResponseSession): Promise<void> => {
    if (result.error) {
        dispatch({ type: AuthActions.loginError, payload: result.error.message });
        return;
    }

    const sessionData = result.data.session;

    if (!sessionData) {
        dispatch({ type: AuthActions.loginError, payload: 'Credentials not found.' });
        return;
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
};
