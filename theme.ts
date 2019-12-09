import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans"',
  },
  palette: {
    primary: {
      main: '#4a4a4a',
      contrastText: '#c3bcbc',
    },
    secondary: {
      main: '#2f2fe3',
      contrastText: '#ffffff',
    },
  },
});

export default theme;
