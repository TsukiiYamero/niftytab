import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useLogOut } from '@/contexts/auth/thunks/useLogout';

export const UserLoggedMenu = () => {
    const logOut = useLogOut();

    const handleLogout = () => {
        logOut();
    };

    return (
        <>
            <MenuItem>
                <Avatar /> Profile
            </MenuItem>

            <Divider />

            <MenuItem>
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
