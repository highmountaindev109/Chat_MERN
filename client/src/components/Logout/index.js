import React, { useContext } from 'react';
import axios from 'axios';
import { message } from 'antd';

// import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../../context';

// const useStyles = makeStyles((theme) => ({
//     logout: {
//         color: 'white'
//     }
// }))

const Logout = () => {
    // const classes = useStyles();
    const { removeCurrentUser } = useContext(UserContext);

    const logout = async () => {
        try {
            await axios.get('/api/logout');
            removeCurrentUser();
        } catch (err) {
            message.error('Something went wrong, please try again later');
        }
    };
    return <span component="button" onClick={logout} color="inherit">
            Log out
        </span>
};

export default Logout;
