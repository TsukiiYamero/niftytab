import Snackbar from '@mui/material/Snackbar';
import { SnackbarActions } from '@/contexts/snackbar/snackbar.types';
import { useGetSnackbarContext, useGetSnackbarDispatchContext } from '@/contexts/snackbar/hooks';
import { forwardRef } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const GlobalSnackbar = () => {
    const { message, opened, type, action, autoHideDuration, position } = useGetSnackbarContext();
    const dispatch = useGetSnackbarDispatchContext();

    const { vertical, horizontal } = position ?? { vertical: 'bottom', horizontal: 'right' };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({
            type: SnackbarActions.setSnackbar,
            payload: {
                message: '',
                opened: false,
                action: null
            }
        });
    };

    return (
        <div>
            {
                action
                    ? <Snackbar
                        open={opened}
                        autoHideDuration={autoHideDuration}
                        onClose={handleClose}
                        message={message}
                        action={action}
                        anchorOrigin={{ vertical, horizontal }}
                    />
                    : <Snackbar
                        open={opened}
                        autoHideDuration={autoHideDuration}
                        onClose={handleClose}
                        message="Note archived"
                        action={action}
                        anchorOrigin={{ vertical, horizontal }}
                    >
                        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>}

        </div>
    );
};
/* Action example
const action = (
    <>
        <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
        </Button>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    </>
); */
