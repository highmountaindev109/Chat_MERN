import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import SideBarLeft from '../SidebarLeft'
import roomContext from '../../contexts/roomContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: '1',
    },
    mainWrapper: {
        width: '100%',
        margin: '4px',
        position: 'relative',
    },
    main: {
        flexGrow: 1,
        height: `calc(100vh - 122px)`,
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
        },
        height: `calc(100vh - 72px)`,
        background: 'white',
        borderRadius: '0px',
        margin: '4px',
        marginRight: '0',
        
    },
    drawerWrapper: {
        zIndex: '100',
    },
    modbileDrawer: {
        [theme.breakpoints.up('xs')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        height: `calc(100vh - 72px)`,
        position: 'absolute',
        bottom: '0px',
        right: '0px',
        borderRadius: '0',
        background: 'white',
        zIndex: '100',
    },
    chatBar: {
        [theme.breakpoints.up('sm')]: {
        //   width: `calc(100% - ${drawerWidth}px)`,
        //   marginLeft: drawerWidth,
        },
        boxShadow: '-1px 1px 20px 2px rgb(0 0 0 / 23%), 0px 1px 13px 0px rgba(0,0,0,0.14)',
        background: 'white',
        height: '50px',
        color: theme.palette.primary.main,
    },
    chatBarContent: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        height: '100%'
    },
    menuButton: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        height: '100%'
    },
    
}));

function ChatLayout({users, room, children}) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { rooms, setRooms } = useContext(roomContext);

//   const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root} color="primary">
        <Hidden xsDown implementation="css" className={classes.drawerWrapper}>
            <Card className={classes.drawer}>
                <SideBarLeft users={users}/>
            </Card>
        </Hidden>
        <div className={classes.mainWrapper}>
            <AppBar className={classes.chatBar} position="static">
                <div className={classes.chatBarContent}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                
                <Button color="primary" variant="contained" size="small" style={{margin: '7px', borderRadius: '0', textTransform: 'none'}}>{room}</Button>
                <IconButton color="primary" variant="contained" style={{margin: '7px', borderRadius: '0', textTransform: 'none'}}>
                    <AddIcon />
                </IconButton>
                </div>
            </AppBar>
            <Hidden smUp implementation="css">
                { mobileOpen &&
                    <Card className={classes.modbileDrawer}>
                        <SideBarLeft users={users} />
                    </Card>
                }
            </Hidden>
            <main className={classes.main}>
                
                <div className={classes.content}>
                    {children}
                </div>
            </main>
        </div>
        
      </div>
  );
}


export default ChatLayout;
