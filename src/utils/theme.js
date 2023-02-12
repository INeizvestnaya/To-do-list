import { lightGreen, orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[800],
      light: orange[400],
      dark: orange[900]
    },
    secondary: {
      main: lightGreen[400],
      light: lightGreen[200],
      dark: lightGreen[600]
    },
    info: {
      main: orange[400],
      dark: orange[600],
      light: orange[200]
    }
  }
});

export default theme;
