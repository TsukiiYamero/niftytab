import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useLogOut } from '@/contexts/auth/thunks/useLogout';
import { useNavigate } from 'react-router-dom';

export const UserLoggedMenu = () => {
    const logOut = useLogOut();
    const navigateTo = useNavigate();

    const handleLogout = () => {
        logOut();
    };

    const goToSettings = () => {
        navigateTo('/settings/password');
    };

    return (
        <>
            <MenuItem>
                <Avatar /> Profile
            </MenuItem>

            <Divider />

            <MenuItem onClick={goToSettings}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>

            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem></>
    );
};
