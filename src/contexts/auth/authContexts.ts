import { createContext, Dispatch } from 'react';
import { AuthActionType, AuthInitialState } from './auth.types';
import { authInitialState } from './reducer';

export const AuthStateContext =
    createContext<AuthInitialState>(authInitialState);

export const AuthDispatchContext =
    createContext<Dispatch<AuthActionType> | null>(null);
