import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Paper,
    Box,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ChatForm from '../ChatForm';
import Draggable from 'react-draggable';
import PrivateMessageList from '../PrivateMessageList';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 2000,
        minWidth: 400,
    },
    header: {
        height: 45,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 7px',
        boxShadow: '1px 1px 11px 1px rgb(0 0 0 / 19%), 0px 0px 0px 0px rgb(0 0 0)',
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    headerContent: {
        cursor: 'move',
        userSelect: 'none',
        flexGrow: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10px',
        fontWeight: 700,
        fontSize: 18,
        lineHeight: 1
    },
    smallAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginLeft: 10,
    },
    content: {
        height: 250,
        width: '100%',
        overflow: 'auto',
    }
}));

const PrivateChat = ({open, setOpen, socket, room, messages, me, to}) => {
    const classes = useStyles();
    if(room)console.log(room.private)
    return (
    <>
    { open &&
        <Draggable bounds="parent" handle='#private-header'
        >
            <Paper className={classes.root}>
                <div className={classes.header} >
                    <Avatar className={classes.smallAvatar}
                        src='/img/default_avatar.png'
                    />
                    <div id="private-header" className={classes.headerContent}>{to.username}</div>
                    <IconButton color='inherit' size='small' onClick={()=>{console.log('set false');setOpen(false)}}>
                        <CloseIcon />
                    </IconButton>
                    
                </div>
                <div className={classes.content}>
                    {/* {messages &&
                        messages.map((message, index) => (<div key={index}>
                                {message.msg}
                            </div>))
                    } */}
                    <PrivateMessageList messages={messages} me={me}/>
                </div>
                <ChatForm socket={socket} to={to.username} username={me.username} room={room}/>
            </Paper>
        </Draggable>
    }
    </>
    );
}

export default PrivateChat;