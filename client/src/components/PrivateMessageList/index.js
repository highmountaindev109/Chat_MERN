import React, { useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: (props) => 
            props.mine
            ?'row'
            :'row-reverse',
    },
    author: {
        fontSize: '1rem',
        fontWeight: '700',
        whiteSpace: 'nowrap',
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline'
        }
    },
    content: {
        margin: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: props => 
            props.mine
            ? 'flex-start'
            : 'flex-end'
    },
    message: {
        background: (props) => 
        props.mine
        ?theme.palette.primary.main
        :'lightgrey',
        color: (props) => 
        props.mine
        ?theme.palette.primary.contrastText
        :'black',
        padding: 5,
        borderRadius: 5,
        borderTopLeftRadius: (props) => 
        !props.mine && 0,
        borderTopRightRadius: (props) => 
        props.mine && 0,
        maxWidth: '200px'
    },
    date: {
        fontSize: 12
    }
}));

const StyledMessage = ({message, mine}) => {
    const classes = useStyles({mine});

    return (
        <div className={classes.root}>
            { !mine &&
                <span className={classes.author}>{message.from}</span>
            }
            
            <div className={classes.content}>
                <div  className={classes.message}>
                    {message.msg}
                </div>
                <div className={classes.date}>{moment(message.date).format('hh:mm')}</div>
            </div>
        </div>
    )
}

const useListStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        height: '100%',
        flex: '1',
        width: '100%',
        padding: 5,
        wordBreak: 'break-word',
        '&::-webkit-scrollbar': {
            width: '5px',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&:hover::-webkit-scrollbar-thumb': {
            backgroundColor: '#00000017',
            outline: 'none',
            borderRadius: '5px',
        }
    }
}))


const PrivateMessageList = ({messages, me}) => {
    const classes = useListStyles();
    const listRef = useRef();
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages]);
    return (
        <div className={classes.root} ref={listRef}>
            { messages &&
                messages.map((message, index) => (
                    <StyledMessage message={message} mine={Boolean(message.from === me.username)} key={index}/>
                ))
            }
        </div>
    )
}

StyledMessage.propTypes = {
    mine: propTypes.oneOf([true, false]).isRequired,
}

export default PrivateMessageList;