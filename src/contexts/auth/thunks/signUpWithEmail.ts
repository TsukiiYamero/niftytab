import { signUpWithEmail } from '@/services/authProviders';
import { AuthResponse } from '@supabase/supabase-js';
import { Dispatch } from 'react';
import { AuthActions, AuthActionType, UserCredentials } from '../auth.types';
import { supabase } from '@/api/config';
import { startSetSession } from './setSession';

/**
 * Sign up a user with email and password, and if successful, it will dispatch
 * a login success action with the user's data.
 * @param dispatch - Dispatch<AuthActionType>
 * @param {UserCredentials} userCredentials - UserCredentials
 */
export const startSignUpWithEmail = async (
    dispatch: Dispatch<AuthActionType>,
    userCredentials: UserCredentials
) => {
    dispatch({ type: AuthActions.requestLogin });

    let result: AuthResponse;

    try {
        result = await signUpWithEmail(userCredentials);
    } catch (error) {
        dispatch({ type: AuthActions.loginError, payload: 'Something went wrong, please try again later.' });
        return false;
    }

    if (result.error) {
        dispatch({ type: AuthActions.loginError, payload: result.error.message });
        return false;
    }

    const resultSession = await supabase.auth.getSession();

    return await startSetSession(dispatch, resultSession);
};
