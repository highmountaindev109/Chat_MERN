import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Emojify, {emojify} from 'react-emojione';
import Emoji from "react-emoji-render";
 

import './style.css';

function MyEmojiRenderer({ children, ...rest }) {
    const options = {
      baseUrl: "https://cdn.jsdelivr.net/gh/iamcal/emoji-data@master/img-apple-64/",
      ext: "png",
    }
    // console.log(rest.text)
    return <Emoji options={options} {...rest} />;
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0.2rem 0.5rem',
        paddingBottom: '0.7rem',
        color: 'black',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'space-between',
        '&:hover': {
            backgroundColor: '#00000017',
        }
    },
    main: {
        display: 'flex',
        justifyContent: 'start',
        alignContent: 'baseline',
    },
    author: {
        margin: '0',
        fontSize: '1rem',
        fontWeight: '700',
        whiteSpace: 'nowrap',
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline'
        }
    },
    semi: {
        fontSize: '1rem',
        fontWeight: '700',
    },
    text: {
        margin: '0 5px',
        fontSize: '1rem',
        whiteSpace: 'pre-wrap',   
    },
    date: {
        margin: '0',
        lineHeight: '1',
        minWidth: '35px',
        font: 'italic 12px sans-serif',
    }
}))

const Message = ({ from, text, date }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.main}>
                <span className={classes.author} color="inherit">{from}</span>
                <span className={classes.semi}>:&nbsp;</span>
                <span className={classes.text}>{
                    <MyEmojiRenderer text = {text.trim()} />
                }</span>
            </div>
            
            <p className={classes.date}>{moment(date).format('hh:mm')}</p>
        </div>
    );
};

Message.propTypes = {
  from: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
};

export default React.memo(Message);
