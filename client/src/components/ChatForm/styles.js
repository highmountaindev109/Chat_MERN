import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    inputArea: {
        borderRadius: '0px',
        display: 'flex',
        height: 'fit-content',
        boxShadow: '1px 1px 0px 0px rgb(0 0 0 / 0%), 0px -1px 0px 0px rgb(0 0 0 / 5%)',
        zIndex: '10',
        backgroundColor: 'white'
    },
    inputForm: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    formActionArea: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '10px'
    },
    formActions: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textArea: {
        
        paddingRight: '20px',
        fontSize: '20px',
        maxWidth: '1px',
        display: 'none',

    },
    emojiTextArea: {
        flexGrow: 1,
        paddingLeft: '20px',
        outline: 'none',
        fontSize: '20px',
    },
    sendButton: {
        color: theme.palette.primary.main,
    },
    emojiArea: {
        '& button, span': {
            outline: 'none'
        },
        zIndex: '3000'
    }
}));

export default useStyles;