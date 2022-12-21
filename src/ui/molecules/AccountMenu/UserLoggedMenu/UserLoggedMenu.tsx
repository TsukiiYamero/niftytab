import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useAuthDispatch } from '@/contexts/auth';
import { startSignOut } from '@/contexts/auth/thunks/signOut';
import { useTabsDispatch } from '@/contexts/tabs/hooks';

export const UserLoggedMenu = () => {
    const authDispatch = useAuthDispatch();
    const tabsDispatch = useTabsDispatch();

    const handleLogout = async () => {
        await startSignOut(authDispatch, tabsDispatch);
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
