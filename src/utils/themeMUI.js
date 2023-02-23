import { createTheme } from '@mui/material/styles';
import { yellow, red } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: yellow[600],
            dark: '#bfb93d',
            contrastText: '#000',
        },
        secondary: {
            light: '#ff7961',
            main: '#000',
            dark: '#007961',
            contrastText: '#000',
        },
        red: {
            main: red[500]
        },
        opacity: {
            main: red[1]
        }
    },


});