import { SnackbarActions, SnackbarTypes } from '../snackbar.types';
import { useGetSnackbarDispatchContext } from './useGetContextSnackbar';
import { useCallback } from 'react';

export const useSnackbar = () => {
    const dispatchSnackbar = useGetSnackbarDispatchContext();

    const openSnackbar = useCallback((message: string, type: SnackbarTypes = 'info') => {
        dispatchSnackbar({
            type: SnackbarActions.setSnackbar,
            payload: {
                opened: true,
                message,
                type
            }
        });
    }, [dispatchSnackbar]);

    return openSnackbar;
};
