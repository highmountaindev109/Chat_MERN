import React from 'react';
import PropTypes from 'prop-types';
import {EmojiConvertor} from 'emoji-js';
import parseHTML from 'parsehtml';
import moment from 'moment';
import randomstring from "randomstring";
import useStyles from './styles';
import Emojify, {emojify} from 'react-emojione';
import reactElementToJSXString from 'react-element-to-jsx-string';

const MyMessage = ({message, font_size}) => {
    let emoji = new EmojiConvertor();
    emoji.img_set = 'apple';
    emoji.img_sets.apple.path = 'https://cdn.jsdelivr.net/gh/iamcal/emoji-data@master/img-apple-64/';
    emoji.use_sheet = true;
    emoji.init_env();
    emoji.supports_css = false;
    emoji.allow_native = false;
    emoji.replace_mode = 'img';// 'unified';
    emoji.use_sheet = true;

    const classes = useStyles()
    const urlify = (text) => {
        let urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, (url) => {
        return `<a href="${url}" target="_blank">${url}</a>`;
        });
        // or alternatively
        // return text.replace(urlRegex, '<a href="$1">$1</a>')
    }

  const emojiConverter = (text) => {
    return emoji.replace_unified(text);
    // let emojiEl = <Emojify>{text}</Emojify>;
    // console.log('emoji', emojiEl);
    // return reactElementToJSXString(emojiEl);
  }

  const convertHTML = (text) => {
    //   console.log('convertHTML',text)
    // console.log(text) 
    text = text.split('\" />').join('\">');
    // console.log(text)
    let result = [];
    var html = parseHTML(text);
    // console.log(text)
    // console.log(html)
    // console.log(html.length)
    if (html.children.length > 0) {
      for (let k = 0; k < html.children.length; k++) {
        let temp = text.split(html.children[k].outerHTML);
        // console.log(text)
        // console.log(temp)
        let key = randomstring.generate(8);
        result.push(<span key={key}>{desanitarize(temp[0])}</span>)
        if (html.children[k].tagName == "IMG") {
          key = randomstring.generate(8)
          result.push(<img key={key} src={html.children[k].attributes[0].nodeValue}
                           className={html.children[k].attributes[1].nodeValue}
                           data-codepoints={html.children[k].attributes[2].nodeValue}/>)
        }
        if (html.children[k].tagName == "A") {
          key = randomstring.generate(8)
          let url = html.children[k].href
          let host = html.children[k].host
          result.push(<span key={key} className={classes.url_underline}
                            onClick={() =>{} }>{url}</span>)
        }
        if (temp[1] !== undefined) {
          if (k == html.children.length) {
            let key = randomstring.generate(8)
            result.push(<span key={key}>{desanitarize(temp[1])}</span>)
          } else {
            text = temp[1]
          }
        }
      }
    } else if (html.tagName !== undefined && html.tagName != "") {
      // only one tag
      let temp = text.split(html.outerHTML)
      // console.log(temp)
      let key = randomstring.generate(8)
      result.push(<span key={key}>{desanitarize(temp[0])}</span>)
      if (html.tagName == "IMG") {
        key = randomstring.generate(8)
        result.push(<img key={key} src={html.attributes[0].nodeValue} className={html.attributes[1].nodeValue}
                         data-codepoints={html.attributes[2].nodeValue}/>)
      }
      if (html.tagName == "A") {
        key = randomstring.generate(8)
        let url = html.href
        let host = html.host
        // console.log(url)
        // console.log(host)
        result.push(<span key={key} className={classes.url_underline}
                          onClick={() => {}}>{url}</span>)
      }
      if (temp[1] !== undefined) {
        let key = randomstring.generate(8)
        // console.log(temp[1])
        // console.log(desanitarize(temp[1]))
        result.push(<span key={key}>{desanitarize(temp[1])}</span>)
      }
    } else {
      // only text
      let key = randomstring.generate(8)
      result.push(<span key={key}>{desanitarize(text)}</span>)
    }
    return result
  }

  const sanitarize = (string) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
    };
    const reg = /[&<>"']/ig;
    return string.replace(reg, match => (map[match]));
  }

  const desanitarize = (string) => {
    string = string.replace(/&amp;/ig, '&')
    string = string.replace(/&lt;/ig, '<')
    string = string.replace(/&gt;/ig, '>')
    string = string.replace(/&quot;/ig, '"')
    string = string.replace(/&#x27;/ig, "'")
    return string
  }

    // if (message.message_type === "image") {
    //   return (
    //     <div className="message">
    //       <div className="message-content">
    //         <p>
    //           <span className="sender"><strong>{message.from}</strong>:&nbsp;</span>
    //           <span className={`text size-${font_size}`}>
    //           {!message.is_check ? <a href="javascript:void(0)"><strong
    //               onClick={() => {}}
    //               style={{cursor: "pointer"}}>click to view</strong></a> :
    //             <img src={message.text} className="photo"/>}
    //           </span>
    //           <span className="time">{moment(message.time).format('HH:mm')}</span>
    //         </p>
    //       </div>
    //     </div>
    //   );
    // } else if (message.message_type === "bold") {
    //   return (
    //     <div className="message">
    //       <div className="message-content">
    //         <p className={`font-${message.color}`}>
    //           <span className="sender"><strong>{message.sender.name}:</strong>&nbsp;</span>
    //           <span
    //             className={`text size-${font_size}  ${message.message_type}`}> {convertHTML(emojiConverter(urlify(sanitarize(message.text))))}</span>
    //           <span className="time">{moment(message.time).format('HH:mm')}</span>
    //         </p>
    //       </div>
    //     </div>
    //   );
    // }

    return (
      <div className={classes.message}>
        <div className={classes.messageContent}>
            <span className={classes.sender}><strong>{message.from}</strong>:&nbsp;</span>
                <span
                className={classes.text + ' ' + classes.size10}>
                {
                        convertHTML(emojiConverter(urlify(sanitarize(message.msg))))
                }
            </span>
        </div>
        <span className={classes.time}>{moment(message.date).format('HH:mm')}</span>
      </div>
    );
}

MyMessage.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.shape.isRequired,
    msg: PropTypes.string.isRequired,
    // message_type: PropTypes.string.isRequired,
    // color: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
//   onActionOnMessage: PropTypes.func.isRequired,
  font_size: PropTypes.number.isRequired,
};

export default MyMessage;
