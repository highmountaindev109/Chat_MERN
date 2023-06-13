import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {

        color: theme.palette.primary.text,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.hover,
        },
        border: `1px solid ${theme.palette.primary.text}`,
        minWidth: '100px',
    },


}))

const OutlinedButton = ({ onClick, type, children }) => {
    const classes = useStyles();

    return (
        <Button onClick={onClick} type={type}  className={classes.root}>{children}</Button>
    )
}

export default OutlinedButton;