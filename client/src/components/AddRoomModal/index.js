import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    List
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { getRooms } from '../../utils';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      padding: '0 10px',
      backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: '0 10px',
        // borderRadius: '0',
        height: '30px'
    }
}));

export default function AddRoomModal({addRoom}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [rooms, setRooms] = useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickRoom = (room) => {
        addRoom(room, (result, message) => {
            if(result) {
                setOpen(false);
            } else {

            }
        }); 
    }

    useEffect(() => {
        if(open) {
            getRooms((data) => {
                setRooms(data);
                console.log(data);
            },
            (err) => {
                alert(err);
            })
        }
    }, [open])

    return (
        <>
        <Button
            variant="outlined"
            color="primary" size="small"
            onClick={handleClickOpen}
            className={classes.button}
        >
            <AddIcon />
        </Button>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{"Add a room or rooms to chat?"}</DialogTitle>
            <DialogContent>
            <List dense className={classes.root}>
            {rooms && rooms.map((room, index) => {
                const labelId = `room-list-label-${index}`;
                return (
                <ListItem key={index} button onClick={() => handleClickRoom(rooms[index].name)}>
                    <ListItemAvatar>
                    <Avatar
                        alt='room avatar'
                        src={`/img/public_chat.png`}
                    />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={room.name} />
                </ListItem>
                );
            })}
            </List>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
                Add
            </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}