import ReactDOM     from 'react-dom';
import { Provider } from './Context';
import App          from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core'



const theme = createMuiTheme({
  spacing: 5,
  palette: {
    primary: {
      //! light: ...
      main: 'rgb(33,133,208)'
      //! dark: ...
    }, 
    
    // Unfortunately, error seems not to accept custom properties even though
    // the new palette colors will.
    error: {
      light: 'rgb(255, 79, 114)',
      main: 'rgb(255, 53, 94)',
      dark: 'rgb(255, 28, 74)'
    },

    white: {
      light: 'var(--light-white)',
      main: 'var(--white)',
      dark: 'var(--dark-white)',
    },

    light: {
      light: 'var(--light-light)',
      main: 'var(--light)',
      dark: 'var(--dark-light)',
    },

    red: {
      light: 'var(--light-red)',
      main: 'var(--red)',
      dark: 'var(--dark-red)',
    },

    orange: {
      light: 'var(--light-orange)',
      main: 'var(--orange)',
      dark: 'var(--dark-orange)',
    },

    yellow: {
      light: 'var(--light-yellow)',
      main: 'var(--yellow)',
      dark: 'var(--dark-yellow)',
    },

    olive: {
      light: 'var(--light-olive)',
      main: 'var(--olive)',
      dark: 'var(--dark-olive)',
    },

    green: {
      light: 'var(--light-green)',
      main: 'var(--green)',
      dark: 'var(--dark-green)',
    },

    teal: {
      light: 'var(--light-teal)',
      main: 'var(--teal)',
      dark: 'var(--dark-teal)',
    },

    cyan: {
      light: 'var(--light-cyan)',
      main: 'var(--cyan)',
      dark: 'var(--dark-cyan)',
    },

    blue: {
      light: 'var(--light-blue)',
      main: 'var(--blue)',
      dark: 'var(--dark-blue)',
    },

    violet: {
      light: 'var(--light-violet)',
      main: 'var(--violet)',
      dark: 'var(--dark-violet)',
    },

    pink: {
      light: 'var(--light-pink)',
      main: 'var(--pink)',
      dark: 'var(--dark-pink)',
    },

    purple: {
      light: 'var(--light-purple)',
      main: 'var(--purple)',
      dark: 'var(--dark-purple)',
    },

    indigo: {
      light: 'var(--light-indigo)',
      main: 'var(--indigo)',
      dark: 'var(--dark-indigo)',
    },

    brown: {
      light: 'var(--light-brown)',
      main: 'var(--brown)',
      dark: 'var(--dark-brown)',
    },

    gray: {
      light: 'var(--light-gray)',
      main: 'var(--gray)',
      dark: 'var(--dark-gray)',
    },

    dark: {
      light: 'var(--light-dark)',
      main: 'var(--dark)',
      dark: 'var(--dark-dark)',
    },

    black: {
      light: 'var(--light-black)',
      main: 'var(--black)',
      dark: 'var(--dark-black)',
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider>
      <App />
    </Provider>
  </ThemeProvider>, 
  document.getElementById('root')
);

