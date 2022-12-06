import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';

type Props = {
    onSignIn: () => void,
    onSignUp: () => void
}

export const UserNotLoggedMenu = ({ onSignIn, onSignUp }: Props) => {
    return (
        <>
            <MenuItem onClick={onSignIn}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                SignIn
            </MenuItem>

            <MenuItem onClick={onSignUp}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                SignUp
            </MenuItem>
        </>
    );
};
