import React from 'react';
import { 
    Paper,

} from '@material-ui/core';

const MessageInputArea = () => {
    return (
        <Paper>
            <form className="chatting__form" onSubmit={onFinish}>
                <InputBase
                size="large"
                autoComplete="off"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                />
                <Button size="large" type="primary" htmlType="submit">
                Send
                </Button>
            </form>
        </Paper>
    );
}

export default MessageInputArea;