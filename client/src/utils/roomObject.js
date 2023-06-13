import Peer from 'simple-peer';
import { getSocket } from '../utils';
class RoomObject  {
    constructor(name, messages,users) {
        this.name = name;
        if(messages) {
            this.messages = messages;
        } else {
            this.messages = [];
        }
        if(users) {
            this.users = users;
        } else {
            this.users = null;
        }
        this.unReadMessages = [];
        this.private = {};

        this.myStream = null;
        this.remoteStreams = [];
        this.cameraState = false;
    }
    
    setMessages(messages) {
        this.messages = [...messages];
    }

    addMessages(messages) {
        console.log('set message to room object', messages);
        this.messages = [...this.messages, ...messages];
    }

    openCamera = async () => {
        let socket = getSocket();
        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        this.streams.push(stream);
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        this.peer=peer;
    
        peer.on("signal", data => {
            // callback(data);
            socket.emit("broadcast video", { signalData: data, from: this.name })
        })
    
        peer.on("stream", stream => {
            this.streams.push(stream);
        });

        peer.on('error', (err)=>{
        
        })
    }
}

export default RoomObject;

