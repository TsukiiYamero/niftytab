import { supabase } from '@/api/config';
import { signInWithGoogle } from '@/services/authProviders';
import { OAuthResponse } from '@supabase/supabase-js';
import { Dispatch } from 'react';
import { AuthActions, AuthActionType, UserCredentials } from '../auth.types';
import { startSetSession } from './setSession';

/**
 * Sign in a user with email and password, and if successful, it will dispatch
 * a login success action with the user's data.
 * @param dispatch - Dispatch<AuthActionType>
 * @param {UserCredentials} userCredentials - UserCredentials
 */
export const startSignInWithGoogle = async (dispatch: Dispatch<AuthActionType>, userCredentials: UserCredentials) => {
    dispatch({ type: AuthActions.requestLogin });

    let resultOAuth: OAuthResponse;

    try {
        resultOAuth = await signInWithGoogle();
    } catch (error) {
        dispatch({ type: AuthActions.loginError, payload: 'Something went wrong, please try again later.' });
        return;
    }

    if (resultOAuth.error) return;

    const resultSession = await supabase.auth.getSession();

    if (!resultSession.data || !resultSession.data.session)
        startSetSession(dispatch, resultSession);
};
