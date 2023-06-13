import React, { useState, useEffect, useContext, useRef } from 'react';
import {
    AppBar,
    Card,
    Hidden,
    IconButton,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

import SideBarLeft from '../SidebarLeft'

import useStyles from './styles'
import ChatRoomContent from '../ChatRoomContent';
import AddRoomModal from '../AddRoomModal';
import ChatForm from '../ChatForm';
import VideoList from '../VideoList';
import Peer from 'simple-peer';
import {StyledTab , StyledTabs} from '../StyledTab';
import PrivateChat from '../PrivateChat';
import RoomObject from '../../utils/roomObject';
import UserContext from '../../context';
import { getSocket } from '../../utils';
import {getPrivateMessages} from '../../utils';
import { CallSharp } from '@material-ui/icons';

const socket = getSocket();

export default function ChatRooms({room}) {
    const classes = useStyles();
    const history= useHistory();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openPrivate, setOpenPrivate] = useState(false);
    const { username, avatar, gender } = useContext(UserContext);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // roomObject array
    const roomsRef = useRef([]);
    // current room index
    const [roomIndex, setRoomIndex] = useState(null);

    const [roomsInfo, setRoomsInfo] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    // receive new message
    const [newMessages, setNewMessages] = useState([]);
    // receive new infomation for rooms
    const [newInfo, setNewInfo] = useState(null);

    // private chat send message to this user
    const [privateTo, setPrivateTo] = useState(null);
    const [privateMessgaes, setPrivateMessages] = useState(null);

    const peersRef = useRef([]);

    // video stream objects

    const [currentStreams, setCurrentStreams] = useState([]);

    const handleChangeRoom = (event, newValue) => {
        setRoomIndex(newValue);
    };

    const createPeer = (userToSignal, callerID, room, stream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            config: { iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }, 
                { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }
            ] },
            sdpTransform: function (sdp) { return sdp },
            stream: stream,
        });

        peer.on('signal', signal => {
            // console.log('sending signal');
            socket.emit('sending video signal', { from: callerID, to: userToSignal, room, signal });
        })

        peer.on('close', () => {
            // console.log('close video');
            removeMyStream(room.name);
        })

        peer.on('error', (err) => {
            // console.log('peer error', err);
            removeMyStream(room.name);
        })
        return peer;
    }

    const addPeer = async (incomingSignal, callerID, room) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            config: { iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }, 
                { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }
            ] },
            sdpTransform: function (sdp) { return sdp },
        })

        peer.signal(incomingSignal);

        peer.on('signal', signal => {
            // console.log('return video signal')
            socket.emit('returning video signal', { from: username, to: callerID, room: room.name,  signal});
        })

        peer.on('stream', stream => {
            // console.log('success stream', stream, room);
            addStream(room.name, callerID, stream);
            // setRemoteStreams([...remoteStreams, {room, streamID: callerID, stream}]);
        })

        peer.on('close', () => {
            // console.log('close video');
            removeStream(room.name, callerID);
            // setRemoteStreams(newStreams);
        })

        peer.on('error', (err) => {
            // console.log('peer error', err);
            removeStream(room.name, callerID);
        })
    }
    // add a new stream to room object
    const addStream = (roomName, callerID, stream) => {
        let room = roomsRef.current.find((item) => (item.name === roomName));
        room.remoteStreams.push({streamID: callerID, stream});
        if(roomName === currentRoom.name) {
            setCurrentRoom({...room});
        }
    }
    // remove a stream form room object
    const removeStream = (roomName, streamID) => {
        let room = roomsRef.current.find((item) => (item.name === roomName));
        const newStreams = room.remoteStreams.filter((item) => (item.streamID != streamID));
        room.remoteStreams = newStreams;
        if(roomName === currentRoom.name) {
            setCurrentRoom({...room});
        }
    }
    const removeMyStream = (roomName) => {
        let room = roomsRef.current.find((item) => (item.name === roomName));
        if(room) {
            room.myStream = null;
            room.cameraState = false;
            if(roomName === currentRoom.name) {
                setCurrentRoom({...room});
            }
        }
    }
    function hasGetUserMedia() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }
    // open my camera
    const openCamera = async () => {
        // console.log('open camera');
        navigator.getUserMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);
        // console.log(navigator.mediaDevices.getUserMedia)
        // console.log(navigator.getUserMedia)
        // console.log(navigator.mediaDevices.enumerateDevices())
        let stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        // console.log(stream);
        let room = roomsRef.current[roomIndex];
        // setCameraState(true);
        // setMyStream({room: room.name, stream});
        room.cameraState = true;
        room.myStream = stream;
        room.users.forEach((user) => {
            // console.log(user, username);
            if(user.username != username) {
                const peer = createPeer(
                    user.username,
                    username,
                    room.name,
                    stream
                );
                peersRef.current.push({room: room.name, peerID: user.username ,peer});
            }
        });

        setCurrentRoom({...room});
        // console.log(room);
        // console.log('set current room to open camera');
    }
    const closeCamera = () => {
        let roomObject = roomsRef.current[roomIndex];
        // console.log('set current room to close room', roomObject, peersRef.current);
        if(roomObject) {
            if(peersRef.current.length > 0) {
                peersRef.current.map((item) => {if(item.room === room) item.peer.destroy()});
                peersRef.current = peersRef.current.filter((item) => (item.room != room));
            }
            roomObject.myStream = null;
            roomObject.cameraState = false;
            setCurrentRoom({...roomObject});
            // console.log('set current room to close room', roomObject);
        }
    }
    useEffect(() => {
        if(room) {
            setRoomIndex(0);
        }
    }, []);

    useEffect(() => {
        if( roomsRef.current.length && roomIndex != null && newMessages && newMessages.length) {
            for (let index = 0; index < roomsRef.current.length; index++) {
                let room = roomsRef.current[index];
                for (let msgIndex = 0; msgIndex < newMessages.length; msgIndex++) {
                    const newMessage = newMessages[msgIndex];
                    // if message is for this room
                    if(newMessage.room === room.name) {
                        if(newMessage.type==='public' && newMessage.msg) {
                            if(index != roomIndex) {
                                room.unReadMessages = [...room.unReadMessages,...newMessages];
                            } else {
                                room.messages = [...room.messages, newMessage];
                            }
                        } else if(newMessage.type==='private' && newMessage.msg && newMessage.to && newMessage.from) {
                            // private message
                            if(index === roomIndex) {
                                let otherUser = null;
                                if(newMessage.from === username) {
                                    otherUser = newMessage.to;
                                } else if(newMessage.to === username) {
                                    otherUser = newMessage.from;
                                }  
                                if(otherUser && openPrivate && privateTo.username === otherUser) {
                                    // set private message to private message content
                                    setPrivateMessages([...privateMessgaes, newMessage])
                                } else {
                                    if(!room.private[otherUser]) {
                                        room.private[otherUser] = 0;
                                    }
                                    room.private[otherUser] ++;
                                }
                            }
                        }
                        if(newMessage.onlineUsers) {
                            room.users = [...newMessage.onlineUsers];
                        }

                        if(index === roomIndex) {
                            setCurrentRoom({...room});
                        }
                    }
                }
            }
            let infos = roomsRef.current.map(({name, unReadMessages}) => ({name, unReadMessages}));
            setRoomsInfo(infos);
        }
    }, [newMessages])

    useEffect(() => {
        // console.log('username', username)
        // console.log('socket opening')
        socket.open();
        // console.log('joining to', { room });
        socket.emit('join room', { room });
        socket.on('joined room',async ({room, onlineUsers}) => {
            // console.log('user joined', room, onlineUsers);
            // console.log('new info for user join')
            setNewInfo({type: 'room', payload: {room, onlineUsers}});
        });
        socket.on('leave room', async ({room, userId}) => {
            // console.log('leave room', userId, currentRoom);
        })
        socket.on('init room', async ({room, onlineUsers, messages}) => {
            
            let usernames = await onlineUsers.map((item) => (item.username));
            if(usernames.includes(username)) {
                // console.log('socket init room', room, onlineUsers, messages);
                // console.log('username: ', username);
                setNewInfo({ type: 'room', payload: { room, onlineUsers, messages}});
            }
        });
        socket.on('room messages', messages => {
            setNewMessages(messages);
        });

        socket.on('video signal', payload => {
            // console.log('receive new video');
            setNewInfo({ type: 'video', payload});
        });

        socket.on('return video signal', payload => {
            setNewInfo({type: 'return video', payload});
        })

        return () => {
            socket.removeAllListeners();
            socket.close();
        };
    }, []);

    // add a new room to chat area
    const addRoom = async (room, callback) => {
        let roomNames = await roomsRef.current.map((oneRoom) => (oneRoom.name));
        if(room && roomNames && roomNames.length > 0 && !roomNames.includes(room)) {
            socket.emit('join room', { room });
            callback(true);
        } else {
            callback(false);
        }
    }
    // remove a room from chat area
    const removeRoom = async (room, callback) => {
        let roomNames = await roomsRef.current.map((oneRoom) => (oneRoom.name));
        if(room && roomNames && roomNames.length > 0 && roomNames.includes(room)) {
            socket.emit('leave room', {room});
            let newRooms = await(roomsRef.current.filter((oneRoom) => (oneRoom.name !=room)));
            roomsRef.current = newRooms;
            // console.log('remove a room');
            let infos = roomsRef.current.map(({name, unReadMessages}) => ({name, unReadMessages}));
            setRoomsInfo(infos);
            if(callback) callback(true);
        } else {
            if(callback) callback(false);
        }
    }

    const receiveNewInfo = async (newInfo) => {
        // console.log('new info for room', newInfo)
        switch(newInfo.type) {
            case 'room':
                if(roomsRef.current && newInfo.payload.room) {
                    
                    let sameRoom = await roomsRef.current.find((room) => (room.name === newInfo.payload.room));
                    if(!sameRoom) {
                        let usernames = await newInfo.payload.onlineUsers.map((item) => (item.username));
                        if(username && usernames.includes(username)) {
                            // console.log('init room messages',newInfo.payload)
                            let newRoomObject = new RoomObject(newInfo.payload.room,newInfo.payload.messages, newInfo.payload.onlineUsers);
                            roomsRef.current.push(newRoomObject);
                        } else {
                            let newRooms = await(roomsRef.current.filter((room) => (room.name != newInfo.payload.room)));
                            roomsRef.current = newRooms;
                        }
                    } else {
                        let usernames = await newInfo.payload.onlineUsers.map((item) => (item.username));
                        if(username && usernames.includes(username)) {
                            if(newInfo.payload.onlineUsers) {
                                sameRoom.users = newInfo.payload.onlineUsers;
                                // setRooms([...rooms]);
                            }
                            if(newInfo.payload.messages) {
                                sameRoom.messages = newInfo.payload.messages;
                            }
                        } else {
                            let newRooms = await(roomsRef.current.filter((room) => (room.name !=newInfo.payload.room)));
                            // console.log('remove me from server', newInfo.payload);
                            roomsRef.current = newRooms;
                        }
                        
                    }
                }
                break;
            case 'video':
                // console.log('process video')
                let { from, room, signal } = newInfo.payload;
                let roomObject = roomsRef.current.find((item) => (item.name === room));
                if(roomObject) {
                    addPeer(signal, from, roomObject);
                }
                break;
            case 'return video':
                // console.log('return video',newInfo.payload)
                let item = peersRef.current.find((p) => (p.room === newInfo.payload.room && p.peerID === newInfo.payload.from));
                // console.log(peersRef.current);
                if(item) {
                    // console.log(item);
                    item.peer.signal(newInfo.payload.signal);
                }
                break;
            default:
                break;
        }
        // console.log('set current room for init room', roomsRef.current[roomIndex]);
        setCurrentRoom({...roomsRef.current[roomIndex]});
        let infos = roomsRef.current.map(({name, unReadMessages}) => ({name, unReadMessages}));
        setRoomsInfo(infos); 
    }
    useEffect(() => {
        // console.log('new info processing', newInfo)
        if(newInfo) receiveNewInfo(newInfo);
        if(roomsRef.current.length > 0 && roomsRef.current.length < roomIndex + 1) {
            setRoomIndex(roomsRef.current.length - 1)
        } else {
           
        }
        
    }, [newInfo]);

    useEffect(() => {
        if(roomsRef.current.length > 0 && roomsRef.current.length < roomIndex + 1) {
            setRoomIndex(roomsRef.current.length - 1)
        } else if( roomsRef.current.length === 0 && roomIndex != null) {
            // console.log(roomsRef.current);
            // console.log('go to home!');
            // console.log('roomIndex', roomIndex);
            history.push('/');
        } else {
            setCurrentRoom({...roomsRef.current[roomIndex]});
        }
        
    }, [roomsInfo])

    useEffect(() => {
        if(roomsRef.current.length > 0 && roomsRef.current.length > roomIndex) {
            roomsRef.current[roomIndex].messages = [...roomsRef.current[roomIndex].messages, ...roomsRef.current[roomIndex].unReadMessages];
            roomsRef.current[roomIndex].unReadMessages = [];
            setOpenPrivate(false);
            setCurrentRoom({...roomsRef.current[roomIndex]});
            let infos = roomsRef.current.map(({name, unReadMessages}) => ({name, unReadMessages}));
            setRoomsInfo(infos);
        }
    }, [roomIndex]);

    useEffect(() => {
        if(currentRoom) {
            let curStreams = [];
            if(currentRoom.myStream) {
                curStreams.push(currentRoom.myStream);
            }
            if(currentRoom.remoteStreams && currentRoom.remoteStreams.length) {
                let curRemoteStreams = currentRoom.remoteStreams.map((item) => (item.stream))
                curStreams = [...curStreams, ...curRemoteStreams];
            }
            setCurrentStreams(curStreams);
        }
    }, [currentRoom])

    useEffect(() => {
        if(openPrivate) {
            if(privateTo && currentRoom && roomIndex !=null) {
                getPrivateMessages({room: currentRoom.name, from: username, to: privateTo.username} ,
                    (data) => {
                        setPrivateMessages(data);
                    },
                    (err) => {
                        console.log(err);
                    }
                );
                if(currentRoom.private[privateTo.username]) {
                    let room = roomsRef.current[roomIndex];
                    room.private[privateTo.username] = 0;
                    setCurrentRoom({...room});
                }
            }
        }
    }, [openPrivate, privateTo])

    return (
        <>
        <div className={classes.root} color="primary">
            <Hidden xsDown implementation="css" className={classes.drawerWrapper}>
                <Card className={classes.drawer}>
                    { currentRoom &&
                        <SideBarLeft users={currentRoom.users && currentRoom.users}
                            unReadInfo={currentRoom.private}
                            setOpenPrivate={setOpenPrivate}
                            setPrivateTo={setPrivateTo}
                            cameraState={currentRoom.cameraState}
                            openCamera = {openCamera}
                            closeCamera = {closeCamera}
                            username={username}
                        />  
                    }
                    
                </Card>
            </Hidden>
            
            <div className={classes.mainWrapper}>
                <AppBar className={classes.chatBar} position="static">
                    <div className={classes.chatBarContent}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <StyledTabs value={roomIndex} onChange={handleChangeRoom}>
                        { roomsInfo.length>0 &&
                            roomsInfo.map((item, index) => (
                                <StyledTab
                                    key={index} label={<span>{item.name}</span>} 
                                    unRead={item.unReadMessages.length}
                                    onClose={roomsInfo.length < 2 ? null: () => removeRoom(item.name)}
                                />
                            ))
                        }
                    </StyledTabs>
                    <AddRoomModal addRoom={addRoom}/>
                    </div>
                </AppBar>
                <Hidden smUp implementation="css">
                    { mobileOpen &&
                        <Card className={classes.modbileDrawer}>
                            <SideBarLeft users={roomIndex != null && currentRoom && currentRoom.users && currentRoom.users}
                                setOpenPrivate={setOpenPrivate}
                                setPrivateTo={setPrivateTo}
                                username={username}
                            />
                        </Card>
                    }
                </Hidden>
               
                <main className={classes.main}>
                    <div className={classes.content}>
                    { currentRoom && roomIndex != null  &&
                        <VideoList streams={currentStreams}/>
                    }
                    { currentRoom && roomIndex != null &&
                        <div className={classes.chatContent}>
                            <ChatRoomContent room={currentRoom}></ChatRoomContent>
                            <ChatForm socket={socket} username={username}  room={currentRoom}/>
                        </div>
                    }
                    </div>
                </main>
            </div>
        </div>
            <PrivateChat open={openPrivate} setOpen={setOpenPrivate}
                socket={socket} me={{username, avatar, gender}} to={privateTo} room={currentRoom} messages={privateMessgaes}
            />
        
        </>
    );
}



