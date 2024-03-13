import { createContext } from 'react';
import type { AuthModalInitialState } from './authModal.types';

export const authModalInitialState: AuthModalInitialState = {
    isOpen: false,
    setIsSignIn: () => { },
    closeModal: () => { },
    openModal: () => { }
};

export const AuthModalContext = createContext<AuthModalInitialState>(authModalInitialState);
