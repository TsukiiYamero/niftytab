import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

export const Settings = () => {
    const { pathname } = useLocation();
    const listSettings = [{
        path: 'password',
        text: 'Password'
    }];

    return (
        <Box>
            <Box>
                <Typography variant='h5' sx={{
                    fontWeight: 600,
                    color: 'var(--main-text-color)'
                }}>
                    Settings
                </Typography>

                <List>
                    {
                        listSettings.map(({ path, text }) =>
                            <SettingsItem key={text} text={text} path={path} pathName={pathname} />
                        )
                    }
                </List>

            </Box>
        </Box>
    );
};

export const SettingsItem = ({ text, path, pathName }: { text: string, path: string, pathName: string }) => {
    return (
        <ListItem sx={{
            padding: '2px 6px',
            backgroundColor: pathName === `/settings/${path}` ? '#ccc9c952' : undefined,
            borderRadius: '.3rem',
            a: {
                color: 'var(--main-text-color)'
            }
        }
        }>
            <NavLink to={`/settings/${path}`}>
                <ListItemText primary={text} />
            </NavLink>
        </ListItem >
    );
};
