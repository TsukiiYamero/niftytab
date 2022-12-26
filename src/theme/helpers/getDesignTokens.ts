import { PaletteMode } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: '#8758ff'
                },
                secondary: {
                    main: '#181818'
                },
                success: {
                    main: '#59d2ae'
                },
                Warning: {
                    main: 'invert(57%) sepia(90%) saturate(682%) hue-rotate(353deg) brightness(95%) contrast(103%)'
                },
                /* background: {
                    default: '#fdfdfd'
                }, */
                text: {
                    primary: '#191729',
                    secondary: '#2f2f2f'
                }
            }
            : {
                // palette values for dark mode
                primary: {
                    main: '#8758ff'
                },
                secondary: {
                    main: '#181818'
                },
                success: {
                    main: '#59d2ae'
                },
                Warning: {
                    main: 'invert(57%) sepia(90%) saturate(682%) hue-rotate(353deg) brightness(95%) contrast(103%)'
                },
                /* background: {
                    default: '#1b1b1d'
                }, */
                text: {
                    primary: '#ffffff',
                    secondary: '#2f2f2f'
                }
            })
    }
});
