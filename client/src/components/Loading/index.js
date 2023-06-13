import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';

export default function Loading() {
    const classes = useStyles();
    return <CircularProgress disableShrink className={classes.root}/>;
}