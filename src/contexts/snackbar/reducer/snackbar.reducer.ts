import { SnackbarActions, SnackbarActionType, SnackbarInfo } from '../snackbar.types';

export const snackbarInitialState: SnackbarInfo = {
    type: 'success',
    message: '',
    opened: false,
    autoHideDuration: 6000,
    position: {
        vertical: 'bottom',
        horizontal: 'right'
    }
};

export const snackbarReducer = (state = snackbarInitialState, action: SnackbarActionType) => {
    switch (action.type) {
        case SnackbarActions.setSnackbar:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
