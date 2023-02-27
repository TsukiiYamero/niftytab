import { useAuthState } from '@/contexts/auth';
import { CommonLine } from '@/ui/atoms/CommonLine';
import { Box, Typography } from '@mui/material';

export const AccountInfo = () => {
    const { user } = useAuthState();

    return (
        <Box>
            <Typography variant='h5' >
                Account Information
            </Typography>

            <CommonLine />

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                alignItems: 'center',
                gap: '1.25rem',
                paddingTop: '.7rem',
                paddingRight: '1.5rem'
            }}>

                <Typography variant='subtitle2' >
                    Email:
                </Typography>

                <Typography>{user?.email}</Typography>
            </Box>

        </Box>
    );
};
