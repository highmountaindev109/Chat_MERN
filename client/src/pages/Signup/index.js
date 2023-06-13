import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
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

import UserContext from '../../context';
import { handleSignup } from '../../utils';
import CustomTextField from '../../components/CustomTextField';
import OutlinedButton from '../../components/OutlinedButton';

const validationSchema = yup.object({
    username: yup
    .string('Enter your nick name.')
    .required('username is required'),
    email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
    password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(8),
        color: 'white',
        
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
        background: theme.palette.primary.main,
        color: 'white'
        // backgroundColor: '#3b56a2ef'
    },
    headerText: {
        // color: 'white'
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
    textField: {
        marginTop: 0,
        fontWeight: 500,
        background: 'transparent',
        color: 'white'
    },
    label: {
        color: 'white !important'
    },
    input: {
        color: 'white'
    },
    signinLink: {
        color: 'white'
    },
    actionField: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '25px'
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


const SignUp = () => {
    const history = useHistory();
    const { setAuth } = useContext(UserContext);
    const classes = useStyles();
   
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            gender: 'male'
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSignup(values, () => setAuth(true), message.error);
        },
    });

    return (
        <Container component="main" className={classes.root} maxWidth="xs">
        <CssBaseline />
        <Card className={classes.card}>
            {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5" className={classes.headerText}>
            Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                    <CustomTextField justify="flex-start"
                        autoComplete="off"
                        name="username"
                        fullWidth
                        id="username"
                        label="Username"
                        className={classes.textField}
                        // InputProps={{
                        //     className: classes.input,
                        //     disableUnderline: false
                        // }}
                        // FormHelperTextProps={{
                        //     className: classes.input
                        // }}
                        // InputLabelProps={{
                        //     className: classes.label,
                        // }}
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <CustomTextField
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="off"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
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
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl component="fieldset">
                    <RadioGroup row aria-label="gender" name="gender" value={formik.values.gender} onChange={formik.handleChange}>
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
                        Sign Up
                    </OutlinedButton>
                </div>
               
            </form>
            <Grid container justify="flex-end">
                <Grid item>
                    <Link
                        className={classes.signinLink}
                        component="button"
                        variant="body2"
                        onClick={() => history.push('/login')}
                    >
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
        </Card>
        {/* <Box mt={5}>
            <Copyright />
        </Box> */}
        </Container>
    );
}

export default SignUp;