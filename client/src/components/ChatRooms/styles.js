import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: '1',
    },
    mainWrapper: {
        width: '100%',
        margin: '2px',
        marginBottom: 0,
        marginRight: 0,
        position: 'relative',
    },
    main: {
        flexGrow: 1,
        height: `calc(100vh - 102px)`,
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
        },
        height: `calc(100vh - 52px)`,
        background: 'white',
        borderRadius: '0px',
        margin: '2px 0 0 0',
        
    },
    drawerWrapper: {
        zIndex: '100',
    },
    modbileDrawer: {
        [theme.breakpoints.up('xs')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        height: `calc(100vh - 52px)`,
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
        boxShadow: '1px 1px 0px 0px rgb(0 0 0 / 0%), 0px 1px 0px 0px rgb(0 0 0 / 5%)',
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
        display: 'flex',
        flexDirection:'row-reverse',
        height: '100%',
    }
    ,
    chatContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative'
    },
    closeButton: {
        borderRadius: '0px',

    }
}));

export default useStyles;