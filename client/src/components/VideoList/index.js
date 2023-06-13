import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        overflow: 'auto',
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
        },
        background: 'rgba(0, 0, 0, 0.04)',
        boxShadow: '1px 1px 6px 0px rgb(0 0 0 / 20%)',
    }
}));

const UserVideo = ({stream}) => {
    const userVideo = useRef();
    useEffect(() => {
        if(stream && userVideo.current) {
            userVideo.current.srcObject = stream;
            console.log('user stream', stream);
        }
    }, [stream])
    return (
        <video ref={userVideo} style={{width: '200px', padding: '5px',}} muted autoPlay/>
    )
}

const VideoList = ({streams}) => {
    const classes = useStyles();
    console.log(streams)

    return (
        <div className={classes.root}>
        { streams &&
            streams.map((stream, index) => (
                <UserVideo stream={stream} key={index}/>
            ))
        }
        </div>
    )
}

export default VideoList;