import { createContext } from 'react';
import { AuthModalInitialState } from './authModal.types';

export const authModalInitialState: AuthModalInitialState = {
    isOpen: false,
    setIsSignIn: () => { },
    closeModal: () => { },
    openModal: () => { }
};

export const AuthModalContext = createContext<AuthModalInitialState>(authModalInitialState);
