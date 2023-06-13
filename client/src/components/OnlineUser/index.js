import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Paper,
    Popover,
    Card,
    CardActionArea,
    CardMedia,
    CardActions,
    CardContent,
    Typography,
    Button,
    Divider,
    Badge
} from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
const useStyles = makeStyles((theme) => ({
    listItem: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5)
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: 140,
        width: 200,
        backgroundImage: '/img/public_chat.png',
    },
    cardButton: {
        borderRadius: '0',
        height: 40,
        textTransform: 'none',
    }
}))

const StyledBadge = withStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        top: 20,
        right: 13
    }
}))((props) => (
    <Badge
        {...props}
        anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
    />
))

const OnlineUser = ({username, user, unRead, setOpenPrivate, setPrivateTo}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        
    };

    const handleClickPrivateChat = (event) => {
        event.preventDefault();
        setPrivateTo(user);
        setOpenPrivate(true);
        setAnchorEl(null);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    return (
        <div>
            <StyledBadge badgeContent={unRead && unRead} color="secondary">
            <ListItem button
                className={classes.listItem}
                onClick={handleClick}
            >
                <ListItemIcon>
                    <Avatar alt="Remy Sharp" src={
                            user.gender === 'male' ? '/img/male.png': '/img/female.png'
                        } 
                        className={classes.avatar}
                    />
                </ListItemIcon>
                
                <ListItemText primary={user.username}/>
                
                
            </ListItem>
            </StyledBadge>
            <Popover
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.cardHeader}
                        // image="/img/public_chat.png"
                    >
                        <Avatar alt="User Avatar" src={
                            '/img/default_avatar.png'
                        } />
                        <span>{user.gender}</span>
                    </CardMedia>
                    <Divider />
                    <Button size="small" color="primary" fullWidth className={classes.cardButton}>
                    <AccountCircleOutlinedIcon />&nbsp;Profile
                    </Button>
                    { user.username != username &&
                        <>
                        <Divider />
                        <Button size="small"
                            color="primary"
                            fullWidth
                            className={classes.cardButton}
                            onClick={ handleClickPrivateChat}
                        >
                        <QuestionAnswerIcon />&nbsp;Private Chat
                        </Button>
                        </>
                    }
                        
                </Card>
            </Popover>
        </div>
    );
}

export default OnlineUser;