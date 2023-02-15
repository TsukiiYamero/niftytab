import { Settings } from '@/ui/molecules/Settings';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const SettingsTemplate = () => {
    return (
        <Box>
            <Settings />
            <Outlet></Outlet>
        </Box>
    );
};
