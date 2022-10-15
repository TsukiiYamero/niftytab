import { signUpWithEmail } from '@/services/authProviders';
import { Dispatch } from 'react';
import { AuthActions, AuthActionType, UserCredentials } from '../auth.types';

export const startSignUpWithEmail = async (
    dispatch: Dispatch<AuthActionType>,
    userCredentials: UserCredentials
) => {
    dispatch({ type: AuthActions.requestLogin });

    const result = await signUpWithEmail(userCredentials);

    // const result = await dispatch({ type: AuthActions.loginSuccess})

    console.log('nice', result);
};
