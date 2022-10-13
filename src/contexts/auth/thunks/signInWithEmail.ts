import { Dispatch } from 'react';
import { AuthActions, AuthActionType } from '../auth.types';

export const startSignInWithEmail = (dispatch: Dispatch<AuthActionType>) => {
    dispatch({ type: AuthActions.requestLogin });
    console.log('nice');
};
