import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

export const Settings = () => {
    const listSettings = ['Password'];

    return (
        <Box>
            <Box>
                <Typography variant='h2' sx={{
                    fontWeight: 600,
                    color: 'var(--main-text-color)'
                }}>
                    Settings
                </Typography>

                <List>

                    {
                        listSettings.map((setting) =>
                            <ListItem key={setting}>
                                <ListItemText primary={setting} />
                            </ListItem>
                        )
                    }

                </List>

            </Box>
        </Box>
    );
};
