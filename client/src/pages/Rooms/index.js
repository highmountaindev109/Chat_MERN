import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FormControlLabel, Checkbox, Container, Button } from '@material-ui/core';
import { RoomsList, PublicLayout, Loading } from '../../components';
import { makeStyles } from '@material-ui/styles';
import UserContext from '../../context';

import { getRooms } from '../../utils'

const useStyles = makeStyles((theme) => ({
    action: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px'
    }
}));

const Rooms = () => {
    const classes = useStyles();
    const [rooms, setRooms] = useState(null);
    const [error, setError] = useState('');
    const [showEmpty, setShowEmpty] = useState(false);
    const history = useHistory();

    useEffect(() => {
        getRooms((data) => {
            setLoading(false);
            setRooms(data);
        },
        (err) => {
            setLoading(false);
            setError(err);
        }
        );
    }, []);

    const { auth, role, setLoading } = useContext(UserContext);
    return (
        <div className="rooms__wrapper">
        <PublicLayout />
        {error ? (
            <p className="rooms__error">{error}</p>
        ) : (
            <Container>
            <div className={classes.action}>
            <FormControlLabel
                control={<Checkbox 
                    name="showEmpty"
                    onChange={(e)=> setShowEmpty(e.target.checked)}
                    color="primary"/>}
                label="Show Empty Rooms"
            />
            { (role !=='guest') && (auth) &&
                <Button
                color="primary"
                component="button"
                variant="contained"
                className={classes.roomButton}
                onClick={() => { history.push('/room/create')}}
            >Create Room</Button>
            }
            </div>
            {rooms &&
                <RoomsList rooms={rooms} showEmpty = {showEmpty} />
            }
            </Container>
        )}
        </div>
    );
};

export default Rooms;
