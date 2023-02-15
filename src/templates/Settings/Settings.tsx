import { Settings } from '@/ui/molecules/Settings';
import { Box, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { ArrowBackIosNewOutlined } from '@mui/icons-material';

export const SettingsTemplate = () => {
    const navigateTo = useNavigate();

    const goToHome = () => {
        navigateTo('/');
    };

    return (
        <Box sx={{
            padding: '1.34rem'
        }}>
            <Box onClick={goToHome} sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.85rem',
                cursor: 'pointer'
            }}>
                <ArrowBackIosNewOutlined />
                <Typography variant='h5'>Back</Typography>
            </Box>

            <Box sx={{
                borderWidth: '1px',
                borderColor: '#ccc9c952',
                borderStyle: 'solid',
                marginBlock: '1rem',
                borderRadius: '1rem'
            }}>
            </Box>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '4rem',
                paddingTop: '1.75rem'
            }}>
                <Settings />
                <Outlet></Outlet>
            </Box>
        </Box>
    );
};
