import { createTheme } from '@mui/material/styles';
const primary = '#28A164';
const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});
export default theme;
