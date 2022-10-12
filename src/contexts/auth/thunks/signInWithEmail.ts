import { AuthActions, AuthActionType } from "../auth.types";
import { Dispatch } from 'react';
import { useAuthDispatch } from "../authContexts";

export const startSignInWithEmail = () => {
    const dispatch = useAuthDispatch();
    return async (dispatch: Dispatch<AuthActionType>) => {

        // start loading
        dispatch({ type: AuthActions.requestLogin });
        console.log('nice')

    }
}