/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardMedia, CardActions, Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
    },
    media: {
        paddingTop: '70%',
        backgroundSize: '100% 100%'

    },
    connect: {
        margin: 'auto'
    }
}))

const RoomExcerpt = ({ name, users }) => {
    const history = useHistory();
    const classes = useStyles();
    return (
        <Card
            className={classes.root}
        >
            <CardMedia
                className={classes.media}
                image="/img/public_chat.png"
            />
            <CardContent>
                <h2>{name}</h2>
                <p>{users} online</p>
            </CardContent>
            <CardActions>
                <div className={classes.connect}>
                    <Button
                        variant="contained"
                        onClick={() => history.push(`/rooms/${name}`)}
                    >
                        Connect
                    </Button>
                </div>
                <div>
                    <PeopleIcon fontSize="small" />
                    <span>{users}</span>
                </div>
            </CardActions>
        </Card>
    );
};

RoomExcerpt.propTypes = {
    name: propTypes.string.isRequired,
    users: propTypes.number.isRequired,
};

export default RoomExcerpt;
