import { ReactFragment } from 'react';

export type SnackbarTypes = 'error' | 'success' | 'info';

export interface SnackbarInfo {
    opened: boolean,
    message: string,
    autoHideDuration?: number;
    action?: ReactFragment | null,
    type?: SnackbarTypes,
    position?: {
        vertical: 'bottom' | 'top',
        horizontal: 'right' | 'left'
    }
};

export enum SnackbarActions {
    setSnackbar = 'set_snackbar',
}

export type SnackbarActionType =
    | { type: SnackbarActions.setSnackbar, payload: SnackbarInfo }
