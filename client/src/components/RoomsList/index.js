import React from 'react';
import propTypes from 'prop-types';

import RoomExcerpt from '../RoomExcerpt';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '30px'
    },
}))

const RoomsList = ({ rooms, showEmpty }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid  container spacing={2}>
                {rooms.map((room, index) => (
                    (room.users || showEmpty)&&
                    <Grid item xs={12} sm={4} md={3}  key={index}>
                        <RoomExcerpt name={room.name} users={room.users} />
                    </Grid >
                ))}
            </Grid>
        </div>
    );
};

RoomsList.propTypes = {
  rooms: propTypes.arrayOf(
    propTypes.shape({
      _id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
    })
  ).isRequired,
};

export default RoomsList;
