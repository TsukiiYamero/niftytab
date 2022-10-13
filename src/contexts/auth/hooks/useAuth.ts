import { useContext } from 'react';
import { AuthDispatchContext, AuthStateContext } from '../authContexts';

export const useAuthState = () => {
    const context = useContext(AuthStateContext);

    return context;
};

export const useAuthDispatch = () => {
    const context = useContext(AuthDispatchContext);
    if (!context)
        throw new Error('useAuthDispatch must be used within a AuthProvider');

    return context;
};
