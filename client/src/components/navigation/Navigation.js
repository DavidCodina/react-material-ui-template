import React, { useState }         from 'react';
import { useHistory, useLocation } from 'react-router-dom'; //! could also just use <NavLinks>
import { makeStyles }              from '@material-ui/core/styles';
import Drawer                      from '@material-ui/core/Drawer';
import Hidden                      from '@material-ui/core/Hidden';
import HeaderBar                   from './HeaderBar';
import List                        from '@material-ui/core/List';
import ListItem                    from '@material-ui/core/ListItem';
import ListItemIcon                from '@material-ui/core/ListItemIcon';
import ListItemText                from '@material-ui/core/ListItemText';
import { HomeOutlined, AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';


const drawerWidth = 250;


const useStyles = makeStyles(theme => {
  return {
    root: { display: 'flex' },
  
    toolbar: theme.mixins.toolbar,
  
    nav: {
      // Using 'lg' here works in conjunction with  using lgUp / mdDown
      // in the <Hidden> components below.
      [theme.breakpoints.up('lg')]: { // https://material-ui.com/customization/breakpoints/
        width: drawerWidth,
        flexShrink: 0
      }
    },
  
    drawerPaper: { 
      width: drawerWidth,
      backgroundColor: theme.palette.light.main,
      borderRight: `2px solid ${theme.palette.blue.main}`
    },
  
    listItemTextPrimary: {
      color: theme.palette.blue.main,
      fontFamily: 'Montserrat',
      fontSize: 24
    },
  
    link: {
      //////////////////////////////////////////////////////////////////
      //
      // This will match the default behavior of the AppBar
      // height: 56,
      // [theme.breakpoints.up('sm')]: { height: 64 }
      // However, this is a better approach:
      //
      //////////////////////////////////////////////////////////////////
      ...theme.mixins.toolbar
    },
  
    activeLink: {
      ...theme.mixins.toolbar,
  
      backgroundColor: theme.palette.blue.main,
      '&:hover': {
        backgroundColor: theme.palette.blue.main
      },
      '& .MuiTypography-root': {
        color: '#FFF'
      },
      '& .MuiSvgIcon-root': {
        color: '#FFF'
      }
    }
  };
});


/* =======================================================================

======================================================================= */


function ResponsiveDrawer(props) {
  const { children, window }        = props;
  const classes                     = useStyles();
  const history                     = useHistory();
  const location                    = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  
  const menuItems = [
    { 
      text: 'Home', 
      icon: <HomeOutlined color="primary" />, 
      path: '/' 
    },
    { 
      text: 'My Notes', 
      icon: <SubjectOutlined color="primary" />, 
      path: '/notes' 
    },
    { 
      text: 'Create Note', 
      icon: <AddCircleOutlineOutlined color="primary" />, 
      path: '/create' 
    },
  ];


  const toggleDrawer = () => { 
    setMobileOpen(!mobileOpen); 
  };


  const renderDrawerContent = () => {
    return (
      <React.Fragment>
        <List style={{ paddingTop: 0 }}>
          {
            menuItems.map(item => {
              return (
                <ListItem 
                  key={item.text} 
                  button // Adds in ripple, hover, etc. 
                  onClick={() => history.push(item.path)}
                  className={ location.pathname === item.path ? classes.activeLink : classes.link }
                >
                  <ListItemIcon style={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText classes={{ primary: classes.listItemTextPrimary }} primary={item.text} />
                </ListItem>
              );
            })
          }
        </List>
      </React.Fragment>
    );
  };


  //! Why is this necessary?
  const container = window !== undefined ? () => window().document.body : undefined;  // eslint-disable-line


  return (
    <div className={classes.root}>
      <HeaderBar toggleDrawer={toggleDrawer} />


      <nav className={classes.nav}>
        <Hidden lgUp> {/* implementation="css" */}
          <Drawer
            container={container}
            variant="temporary"
            anchor={'left'}
            open={mobileOpen}
            onClose={toggleDrawer}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }} // Better open performance on mobile.
          >
            { renderDrawerContent() }
          </Drawer>
        </Hidden>


        <Hidden mdDown> {/* implementation="css" */}
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            open
          >
            { renderDrawerContent() }
          </Drawer>
        </Hidden>
      </nav>

      { children }
    </div>
  );
}


export default ResponsiveDrawer;
