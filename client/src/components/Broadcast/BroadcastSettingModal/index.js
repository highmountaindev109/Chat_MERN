import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    FormHelperText,
    Checkbox,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import VideocamIcon from '@material-ui/icons/Videocam';

const useStyles = makeStyles((theme) => ({
    cameraBtn: {
        borderRadius: '0px',
        height: '40px',
        background: theme.palette.primary.main,
    },
}));

export default function BroadcastSetting({users}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [devices, setDevices] = useState(null);
    const [usersState, setUsersState] = useState(null);

    const handleClickOpen = () => {
        // console.log('users', users)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOK = () => {
        if(usersState) {
            let usersChecked = usersState.filter((state) => (state.checked));
            // console.log(usersChecked);
        }
        setOpen(false);
    }

    const handleUserStateChange = (event) => {
        if(usersState) {
            let states = [...usersState];
            let userState = states.find((state) => (state.username === event.target.name));
            userState.checked = event.target.checked;
            setUsersState(states);
        }
    };

    const getDevices = () => {
        let devices = navigator.mediaDevices.enumerateDevices();
        // console.log(devices);
        return devices;
    }

    useEffect(() => {
        let devices = getDevices();
        let audioDevices = [];
        let videoDevices = [];
        if(devices && devices.length) {
            for (let index = 0; index < devices.length; index++) {
                const element = devices[index];
                if (element.deviceId != "default" && element.deviceId != "communications") {
                    if (element.kind == "audioinput") {
                      audioDevices.push({deviceId: element.deviceId, label: element.label, groupId: element.groupId});
                    } else if (element.kind == "videoinput") {
                      videoDevices.push({deviceId: element.deviceId, label: element.label, groupId: element.groupId});
                    }
                }
            }
        }
        // console.log(audioDevices);
        // console.log(videoDevices);
    })

    useEffect(() => {
        // console.log('users',users);
        if(users) {
            let states = users.map((user) => ({...user, checked: true}));
            setUsersState(states);
        }
    }, [users])

    return (
        <div>
        <Button fullWidth
                color="primary"
                variant="contained"
                onClick={handleClickOpen}
                className={classes.cameraBtn}
            >Turn on my camera
                &nbsp;
                <VideocamIcon />
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Turn on devices to broadcast</DialogTitle>
            <DialogContent>
            {/* <DialogContentText>
                Select users to broadcast
            </DialogContentText> */}
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Select users to broadcast</FormLabel>
                <FormGroup>
                { usersState && usersState.map((item, index) => (
                    <FormControlLabel key={index}
                        control={<Checkbox checked={item.checked} onChange={handleUserStateChange} name={item.username} />}
                        label={item.username}
                    />
                ))
                    
                }
                </FormGroup>
            </FormControl>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleOK} color="primary">
                OK
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}