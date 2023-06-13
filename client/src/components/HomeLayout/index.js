import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar,
    Toolbar
} from "@material-ui/core";
import AppMenu from '../AppMenu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: 'row',
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        flexWrap: 'wrap',
        minHeight: '50px'
    },
    title: {
        flexGrow: 1,
        minHeight: '50px'
    },
    logo : {
        cursor: 'pointer'
    }
}));
const HomeLayout = (props) => {
    const classes = useStyles();
    const history = useHistory();
    
    return (
    <div>
        <AppBar position="static" className={classes.root}>
            <Toolbar  className={classes.title}>
                <img
                    src="/img/logo.png"
                    alt="logo"
                    className={classes.logo}
                    onClick={()=>history.push('/')}
                />
            </Toolbar>
            <AppMenu />
        </AppBar>
        {props.children}
    </div>
    )
}

export default HomeLayout;