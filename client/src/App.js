import React, { useContext } from 'react';
import { Context }           from './Context';
import { HashRouter }        from 'react-router-dom'; // HashRouter generally works better for GitHub, but normally use BrowserRouter.
import Router                from './components/navigation/Router';
import { makeStyles }        from '@material-ui/core/styles';
import ResponsiveDrawer      from './components/navigation/Navigation';
import Container             from '@material-ui/core/Container';
import './scss/App.scss';


const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar //! necessary for content to be below app bar
}));


/* =======================================================================

======================================================================= */


function App(){  
  const value   = useContext(Context);
  const classes = useStyles();


  return (
    <HashRouter>
      <ResponsiveDrawer>
      <main>
        <div className={classes.toolbar} />
        
        <Container className="flex-1" style={{ padding: 25 }}>
          <Router value={value} />
        </Container>   
      </main>
      </ResponsiveDrawer>
    </HashRouter> 
  );
}


export default App;

