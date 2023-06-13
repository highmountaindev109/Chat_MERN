import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar,
    Toolbar,
    Container,
    Button,
    Link
} from "@material-ui/core";
import AppMenu from '../AppMenu';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../../context';

const useStyles = makeStyles((theme) => ({
    root: { 
      flexGrow: 1,
      background: theme.palette.primary.main,
    },
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        
    },
    roomButton: {
       height: '100%'
    },
    title: {
      flexGrow: 1,
    },
    logo : {
        cursor: 'pointer'
    }
}));
const PublicLayout = () => {
    const classes = useStyles();
    const history = useHistory();
    const { auth } = useContext(UserContext);
    return (
    <AppBar position="static" className={classes.root}>
        <Container className={classes.navbarDisplayFlex}>
            <Toolbar className={classes.title}>
                <img
                    src="/img/logo.png"
                    alt="logo"
                    className={classes.logo}
                    onClick={()=>history.push('/')}
                />
            </Toolbar>
            
            { auth ?
                <AppMenu />
                :
                <Button
                    color="inherit"
                    component="button"
                    size="large"
                    onClick={() => history.push('/login')}
                >Login</Button>
            }
        </Container>
    </AppBar>
    )
}

export default PublicLayout;