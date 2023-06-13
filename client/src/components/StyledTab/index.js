import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/Close';
import theme from '../../themes/normal';

const useTabStyles = makeStyles((theme) => {
    root: {
        
    }
});

const StyledBadge = withStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px'
    }
}))((props) => (
    <Badge
        {...props}
        anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
        }}
    />
))

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        height: '30px',
        border: '1px solid',
        minHeight: '10px',
        minWidth: '0px',
        padding: '0px',
        overflow: 'visible'
    },
    selected: {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        padding: '0px',
        '& *:first-child': {
            margin: '5px'
        },
        '& *:last-child': {
            margin: '5px'
        }
    },
    
    }))((props) => {
        let newProps = {...props};
        delete newProps.onClose;
        delete newProps.unRead;
        console.log(props.unRead)
        return(
            <StyledBadge color="secondary"
                badgeContent={props.unRead} 
            >
                <Tab disableRipple  {...newProps} icon={props.onClose && <CloseIcon fontSize="small"
                onClick={()=> props.onClose()}/>} />
            </StyledBadge>
        )
        
    });

const StyledTabs = withStyles({
    root: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible'
    },
    scroller: {
        height: '100%',
    },
    flexContainer: {
        height: '100%',
    },
    indicator: {
        display: 'none',
    },
})((props) => <Tabs {...props} TabIndicatorProps={{}} />);

export { StyledTab, StyledTabs };