import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    List,
    Button,
    ListSubheader,
} from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import OnlineUser from '../OnlineUser';
import BroadcastSetting from '../Broadcast/BroadcastSettingModal';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%'
    },
    cameraBtn: {
        borderRadius: '0px',
        height: '40px',
        background: theme.palette.primary.main,
    },
    list: {
        padding: '0',
    },
    listItem: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5)
    }
}))


const SideBarLeft = ({ username, unReadInfo, users, setOpenPrivate, setPrivateTo, cameraState, openCamera, closeCamera }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {/* <Button fullWidth
                className={classes.cameraBtn}
                color="primary"
                variant="contained"
                onClick={cameraState? () => closeCamera(): () => openCamera()}
            >{ cameraState
                ?
                'Turn off my camera'
                :
                'Turn on my camera'
            }
                 &nbsp;
                <VideocamIcon />
            </Button> */}
            <BroadcastSetting users={users}/>
            <List  subheader={<ListSubheader>online</ListSubheader>}
            component="nav" aria-label="main mailbox folders" className={classes.list}>
                { users &&
                        users.map((user, index)=>(
                            // <ListItem button key={index} className={classes.listItem}>
                            //     <ListItemIcon>
                            //         <Avatar alt="Remy Sharp" src={
                            //                 user.gender === 'male' ? '/img/male.png': '/img/female.png'
                            //             } 
                            //             className={classes.avatar}
                            //         />
                            //     </ListItemIcon>
                            //     <ListItemText primary={user.username}/>
                            // </ListItem>
                            <OnlineUser username={username} user={user} key={index} setOpenPrivate={setOpenPrivate}
                                setPrivateTo={setPrivateTo} unRead={unReadInfo[user.username]}/>
                        ))
                }
                
            </List>
        </div>
    )
}

export default SideBarLeft;