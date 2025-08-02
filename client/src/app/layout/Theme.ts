// theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        text: {
            primary: '#040604',
        },
        background: {
            default: '#f6faf6',
            paper: '#ffffff', // Optional: for cards, modals, etc.
        },
        primary: {
            main: '#5ab85a',  // Primary buttons, highlights
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#DAF2DA',  // Secondary buttons, tags
            contrastText: '#040604',
        },
        success: {
            main: '#5bd75b',  // Accent/positive states (success banners, confirmations)
            contrastText: '#ffffff',
        },
    },
});

export default theme;
