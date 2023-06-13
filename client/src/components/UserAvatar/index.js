import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    }
}))

const UserAvatar = ({avatar}) => {
    const classes = useStyles();

    return (
        <Avatar
            className={classes.root}
            src={ avatar ?
                avatar:
                '/img/default_avatar.png'
            }
            alt='user avatar'
        ></Avatar>
    );
}

export default UserAvatar;