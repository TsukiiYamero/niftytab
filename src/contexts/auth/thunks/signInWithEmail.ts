import type { Dispatch } from 'react';
import type { AuthActionType, UserCredentials } from '../auth.types';

import { supabase } from '@/api/config';
import { signInWithEmail } from '@/services/authProviders';
import { AuthActions } from '../auth.types';
import { startSetSession } from './setSession';

/**
 * Sign in a user with email and password, and if successful, it will dispatch
 * a login success action with the user's data.
 * @param dispatch - Dispatch<AuthActionType>
 * @param {UserCredentials} userCredentials - UserCredentials
 */
export const startSignInWithEmail = async (dispatch: Dispatch<AuthActionType>, userCredentials: UserCredentials) => {
    dispatch({ type: AuthActions.requestLogin });

    const { error } = await signInWithEmail(userCredentials);

    if (error) {
        dispatch({ type: AuthActions.loginError, payload: error.message });
        return false;
    }

    const resultSession = await supabase.auth.getSession();

    await startSetSession(dispatch, resultSession);

    return true;
};
