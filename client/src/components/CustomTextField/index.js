import {
  withStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CustomTextField = withStyles({
    root: {
        '& input, label': {
            color: 'white'
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .Mui-error': {
            color: 'white',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white !important',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white !important',
        },
        '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white !important',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
},
})(TextField);

export default CustomTextField;
  