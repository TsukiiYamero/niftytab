import { signUpWithEmail } from '@/services/authProviders';
import { AuthResponse } from '@supabase/supabase-js';
import { Dispatch } from 'react';
import { AuthActions, AuthActionType, AuthLoginData, UserCredentials } from '../auth.types';

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
        return;
    }

    if (result.error) {
        dispatch({ type: AuthActions.loginError, payload: result.error.message });
        return;
    }

    const userData = result.data.user;
    const sessionData = result.data.session;

    if (!userData || !sessionData) {
        dispatch({ type: AuthActions.loginError, payload: 'Credentials not found.' });
        return;
    }

    const authLoginData: AuthLoginData = {
        user: {
            avatarUrl: userData?.user_metadata?.avatar_url ?? '',
            email: userData?.email ?? '',
            fullName: userData?.user_metadata?.full_name ?? '',
            id: userData?.id
        },
        token: sessionData.access_token
    };

    dispatch({ type: AuthActions.loginSuccess, payload: authLoginData });
};
