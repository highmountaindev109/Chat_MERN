import React from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedButton from '../OutlinedButton';

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.palette.primary.main,
        display: 'flex',
        padding: '30px 30px',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: theme.palette.primary.text
    },
    actionButton: {
        padding: '10px',
    }
}));

const LoginSelect = ({onSelect}) => {
    const classes = useStyles();



    return (
        <Card className={classes.root}>
            <h2>Please select login mode</h2>
            <div className={classes.actionButton} onClick={() => { onSelect(false) }}>
                <OutlinedButton >Login</OutlinedButton>
            </div>
            <div className={classes.actionButton} onClick={() => { onSelect(true) }}>
                <OutlinedButton >Guest</OutlinedButton>
            </div>
            
        </Card>
    )
}

export default LoginSelect;