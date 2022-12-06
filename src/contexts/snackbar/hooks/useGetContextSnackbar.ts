import { useContext } from 'react';
import { SnackbarContext, SnackbarDispatchContext } from '../snackbarContext';

export const useGetSnackbarContext = () => {
    const context = useContext(SnackbarContext);
    return context;
};

export const useGetSnackbarDispatchContext = () => {
    const context = useContext(SnackbarDispatchContext);

    if (!context)
        throw new Error('useAuthDispatch must be used within an AuthProvider');

    return context;
};
