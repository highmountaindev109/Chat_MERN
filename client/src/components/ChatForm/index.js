import React, { useState, useRef, useEffect } from 'react';
import {
    InputBase,
    IconButton,
    Popper,
    Grow,
    ClickAwayListener,
    CssBaseline,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import Picker from 'emoji-picker-react';
import useStyles from './styles';
import InputEmoji from './test'

import {EmojiConvertor} from 'emoji-js';
import parse from 'html-react-parser';
import Emoji from "react-emoji-render";
import ContentEditable from 'react-contenteditable'
let emoji = new EmojiConvertor();
emoji.img_set = 'apple';
emoji.img_sets.apple.path = 'https://cdn.jsdelivr.net/gh/iamcal/emoji-data@master/img-apple-64/';
emoji.use_sheet = true;
emoji.init_env();
emoji.supports_css = false;
emoji.allow_native = false;
emoji.replace_mode = 'img';// 'unified';
emoji.use_sheet = true;

function MyEmojiRenderer({ children, ...rest }) {
    const options = {
      baseUrl: "https://cdn.jsdelivr.net/gh/iamcal/emoji-data@master/img-apple-64/",
      ext: "png",
    }
    console.log(rest.text)
    return <Emoji options={options} {...rest} />;
};

const ChatForm = ({socket, room, username, to}) => {
    const classes = useStyles();
    const [msg, setMsg] = useState('');
    const inputRef = useRef(null);
    const formRef = useRef(null);
    const emojiTextRef = useRef('');
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const onEmojiClick = (event, emojiObject) => {
        let emoji = emojiObject.emoji;
        setMsg(msg + emoji);
        handleClose(event);
        inputRef.current.focus();
    };

    const emojiConverter = (text) => {
        console.log(text)
        return emoji.replace_unified(text);
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        console.log('close emoji paper')
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }
        setOpen(false);
    };
    const onFinish = (e) => {
        e.preventDefault();
        sendMessage();
    };

    const sendMessage = () => {
        let realMsg = msg.trim();
        console.log('realMsg', realMsg)
        if (realMsg) {
            const date = Date.now();
            if(to) {
                console.log(username, to);
                socket.emit('private message', { msg: realMsg, room: room.name, from: username, to, date });
            } else{
                console.log(username, room.name, to);
                socket.emit('public message', { msg: realMsg, room: room.name, from: username, date });
            }
            
            setMsg('');
        }
    }

    const handleKeyDown = (e) => {
        console.log(e)
        if(e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            console.log(formRef);
            // formRef.current.submit();
            onFinish(e);
        }
    }
    const addEmoji = e => {
        console.log(e)
        let sym = e.undefined.split('-');
        let codesArray = [];
        sym.forEach(el => codesArray.push('0x' + el));
        let emoji = String.fromCodePoint(...codesArray);
        setMsg(msg + emoji);
        handleClose(e);
        inputRef.current.firstChild.focus();
    }
    const handleChange = evt => {
        emojiTextRef.current = evt.target.value;
        console.log('change emoji container',evt.target.value)
    };
    const handleOnEnter = () => {
        // onFinish();
        sendMessage()
    }
    useEffect(() => {
        console.log(msg)
    }, [msg])
    
    return (
        <div className={classes.inputArea}>
            <form className={classes.inputForm} onSubmit={onFinish} ref={formRef}>
                <div className={classes.formActionArea}>
                    <div className={classes.formActions}>
                        <IconButton aria-label="send"
                            variant="contained"
                            color="primary"
                            size="small"
                        >
                            <AddIcon fontSize="small"/>
                        </IconButton>
                        {/* <IconButton 
                            size="small"
                            variant="contained"
                            ref={anchorRef}
                            onClick={handleToggle}>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10' /><path d='M8 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 8 7M16 7a2 2 0 1 0-.001 3.999A2 2 0 0 0 16 7M15.232 15c-.693 1.195-1.87 2-3.349 2-1.477 0-2.655-.805-3.347-2H15m3-2H6a6 6 0 1 0 12 0' /></svg>
                        </IconButton> */}
                    </div>
                </div>
                <InputEmoji
                    value={msg}
                    onChange={setMsg}
                    cleanOnEnter
                    onEnter={handleOnEnter}
                    placeholder="Type a message"
                />
                {/* <div className={classes.emojiTextArea} contentEditable={true} onChange={(e) => {console.log('ok');setMsg(e.target.value)}}
                onInput={e => {console.log('Text inside div', e.currentTarget.textContent);setMsg(e.currentTarget.textContent)}}>{
                    parse(emojiConverter(msg))
                }</div> */}
                {/* <ContentEditable
                    innerRef={inputRef}
                    className={classes.emojiTextArea}
                    html={emojiConverter(msg)} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={handleChange} // handle innerHTML change
                    tagName='div' // Use a custom HTML tag (uses a div by default)
                    onKeyDown={handleOnEnter}
                /> */}
                {/* <InputBase
                    ref={inputRef}
                    className={classes.textArea}
                    id='emoji-input'
                    size="large"
                    autoComplete="off"
                    value={msg}
                    multiline
                    onKeyDown={handleKeyDown}
                /> */}
                {/* <IconButton aria-label="send"
                    className={classes.sendButton}
                    variant="contained"
                    type="submit"
                    disabled={msg.trim()? false: true}
                >
                    <SendIcon fontSize="default"/>
                </IconButton> */}
            </form>
            {/* <Popper className={classes.emojiArea}
                open={open} anchorEl={anchorRef.current} role={undefined} transition>
            {
                ({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <ClickAwayListener onClickAway={handleClose}>
                        {/* <Picker onSelect={addEmoji} /> */}
                        {/* <EmojiPicker onChange={addEmoji} /> */}
                        {/* <div>
                        {chosenEmoji ? (
                            <span>You chose: {chosenEmoji.emoji}</span>
                        ) : (
                            <span>No emoji Chosen</span>
                        )}</div> */}
                        {/* <div>
                            <Picker onEmojiClick={onEmojiClick} preload={true} />
                        </div> */}
                        
                    {/* </ClickAwayListener>
                </Grow>
                )
            }
            </Popper> */}
        </div>
    )
}

export default ChatForm;