import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    CssBaseline,
    Link,
    Grid,
    Typography,
    Container,
    Card,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import LoginSelect from '../../components/LoginSelect';

import UserContext from '../../context';
import { handleLogin, handleGuestLogin } from '../../utils';
import OutlinedButton from '../../components/OutlinedButton';
import CustomTextField from '../../components/CustomTextField';


const loginValidationSchema = yup.object({
    email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
    password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
const guestValidationSchema = yup.object({
    nickname: yup
    .string('Enter your nickname')
    .required('Nickname is required'),
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'url("/img/login-background.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    error: {
        color: 'red',
    },
    card: {
        // marginTop: theme.spacing(8),
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
        background: theme.palette.primary.main
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    sigupLink: {
        color: 'white',
    },
    actionField: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: '25px',
        marginBottom: '15px',
        '& button': {
            margin: '5px'
        }
    }
}));

const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
    root: {
      color: red[400],
      '&$checked': {
        color: red[600],
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);



const Login = () => {
    const history = useHistory();
    const { setAuth } = useContext(UserContext);
    const classes = useStyles();
    const [selected, setSelected] = useState(false);
    const [guest, setGuest] = useState(false);
    const [error, setError] = useState();

    const handleSelectMode = (isGuest) => {
        if(isGuest) {
            setGuest(true)
        } else {
            setGuest(false);
        }
        setSelected(true);
    }

    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginValidationSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            handleLogin(values, () => setAuth(true), (msg) => { setError(msg) } );
        },
    });

    const guestFormik = useFormik({
        initialValues: {
            nickname: '',
            gender: 'male',
        },
        validationSchema: guestValidationSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            handleGuestLogin(values,() => setAuth(true), (msg) => { setError(msg)} );
        },
    });

    return (
        <Container component="main" className={classes.root} maxWidth="xs">
            { !selected ?
                <LoginSelect onSelect={handleSelectMode}/>
                :
                <>

                <CssBaseline />
                { !guest ?
                    <Card className={classes.card}>
                        <Typography component="h1" variant="h5">
                        Sign in
                        </Typography>
                        <Typography className={classes.error}>{error}</Typography>
                        <form className={classes.form} noValidate onSubmit={loginFormik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                <CustomTextField
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="off"
                                    value={loginFormik.values.email}
                                    onBlur={loginFormik.handleBlur}
                                    onChange={loginFormik.handleChange}
                                    error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
                                    helperText={loginFormik.touched.email && loginFormik.errors.email}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <CustomTextField
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={loginFormik.values.password}
                                    onBlur={loginFormik.handleBlur}
                                    onChange={loginFormik.handleChange}
                                    error={loginFormik.touched.password && Boolean(loginFormik.errors.password)}
                                    helperText={loginFormik.touched.password && loginFormik.errors.password}
                                />
                                </Grid>
                            </Grid>
                            <div className={classes.actionField}>
                                <OutlinedButton
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign in
                                </OutlinedButton>
                                <OutlinedButton
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick = {() => { setSelected(false); setError(null) }}
                                >
                                    Return
                                </OutlinedButton>
                            </div>
                        </form>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link
                                    className={classes.sigupLink}
                                    component="button"
                                    onClick={() => { history.push('/signup') }}
                                    variant="body2"
                                >
                                    Create a new account
                                </Link>
                                
                            </Grid>
                        </Grid>
                    </Card>
                    :
                    <Card className={classes.card}>
                        <Typography component="h1" variant="h5">
                        Sign in with guest
                        </Typography>
                        <Typography className={classes.error}>{error}</Typography>
                        <form className={classes.form} noValidate onSubmit={guestFormik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                <CustomTextField
                                    fullWidth
                                    id="nickname"
                                    label="Nickname"
                                    name="nickname"
                                    autoComplete="off"
                                    value={guestFormik.values.nickname}
                                    onBlur={guestFormik.handleBlur}
                                    onChange={guestFormik.handleChange}
                                    error={guestFormik.touched.nickname && Boolean(guestFormik.errors.nickname)}
                                    helperText={guestFormik.touched.nickname && guestFormik.errors.nickname}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                    <RadioGroup row aria-label="gender" name="gender" value={guestFormik.values.gender} onChange={guestFormik.handleChange}>
                                        <FormControlLabel value="female" control={<RedRadio />} label="Female" />
                                        <FormControlLabel value="male" control={<GreenRadio />} label="Male" />
                                    </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <div className={classes.actionField}>
                                <OutlinedButton
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Guest Sign
                                </OutlinedButton>
                                <OutlinedButton
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick = {() => { setSelected(false); setError(null); }}
                                >
                                    Return
                                </OutlinedButton>
                            </div>
                        </form>
                    </Card>
                }
            </>
            }
        </Container>
    );
}

export default Login;