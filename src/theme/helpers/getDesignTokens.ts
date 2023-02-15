import { PaletteMode, ThemeOptions } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: '#ba68c8'
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
                    main: '#ba68c8'
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
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            'system-ui',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(',')
    },
    components: {
        ...(mode === 'light')
            ? {
                MuiOutlinedInput: {
                    styleOverrides: {
                        root: {
                            '& input': {
                                boxShadow: 'var(--bg-color) 0 0 0 1000px inset !important',
                                WebkitTextFillColor: 'var(--main-text-color) !important'
                            }
                        }
                    }
                }
            }
            : {
                MuiInputLabel: {
                    styleOverrides: {
                        root: {
                            color: 'var(--main-text-color)'
                        }
                    }
                },
                MuiOutlinedInput: {
                    styleOverrides: {
                        root: {
                            '& fieldset': {
                                borderColor: 'var(--main-text-color)'
                            },
                            '& input': {
                                boxShadow: 'var(--bg-color) 0 0 0 1000px inset !important',
                                WebkitTextFillColor: 'var(--main-text-color) !important'
                            }
                        }
                    }
                }
            }
    }
});
