import { createTheme } from '@mui/material/styles';
const primary = '#28A164';
const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    info: {
      main: '#e5e5e5',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    subtitle1: {
      fontSize: '1.5rem',
      fontWeight: '300',
      textTransform: 'uppercase',
      textAlign: 'center',
    },
  },
});
export default theme;
