import { PaletteMode } from '@mui/material';
import { amber, deepOrange } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: amber,
                background: {
                    default: '#fdfdfd'
                },
                text: {
                    primary: '#191729',
                    secondary: '#2f2f2f'
                },
                icons: {
                    primary: '#191729'
                }
            }
            : {
                // palette values for dark mode
                primary: deepOrange,
                background: {
                    default: '#1b1b1d'
                },
                text: {
                    primary: '#ffffff',
                    secondary: '#2f2f2f'
                }
            })
    }
});
