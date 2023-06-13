import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { MeetingRoom, PeopleAlt, Block } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
        backgroundColor: theme.palette.primary.main,
        zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function AdminLayout({ children }) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar />
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
                <div className={classes.drawerContainer}>
                <List>
                    <ListItem button onClick={()=>(history.push('/admin/rooms'))}>
                        <ListItemIcon><MeetingRoom /></ListItemIcon>
                        <ListItemText primary='Rooms' />
                    </ListItem>
                    <ListItem button onClick={()=>(history.push('/admin/users'))}>
                        <ListItemIcon><PeopleAlt /></ListItemIcon>
                        <ListItemText primary='Users' />
                    </ListItem>
                    <ListItem button onClick={()=>(history.push('/admin/bans'))}>
                        <ListItemIcon><Block /></ListItemIcon>
                        <ListItemText primary='Bans' />
                    </ListItem>
                </List>
                </div>
        </Drawer>
        <main className={classes.content}>
            <Toolbar />
            {
                children
            }
        </main>
        </div>
    );
}