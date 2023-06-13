import React from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Typography,
    Container,
    Card,
    MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { handleCreateRoom } from '../../utils';

const categorys = [
    'Comedy',
    'Entertainment',
    'Gaming',
    'Social',
    'Technology',
    'Teen',
    'Other',
];

const validationSchema = yup.object({
    name: yup
    .string('Enter your nick name.')
    .required('Name is required'),
    category: yup
    .string('Please select category')
    .required('Category is required')
});
const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(8),
        color: 'white'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
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
    }
}));



const CreateRoom = () => {
    const history = useHistory();
    const classes = useStyles();
   
    const formik = useFormik({
        initialValues: {
            name: '',
            category: 'Comedy',
            maxUsers: 100,
            password: '',
            descirption: '',
            welcomeMessage: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleCreateRoom(values, () => history.push('/rooms'), message.error);
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
            Create Room
            </Typography>
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                    <TextField
                        autoComplete="off"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Room name"
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
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="off"
                            name="maxUsers"
                            required
                            fullWidth
                            id="maxUsers"
                            type="number"
                            label="Room maxUsers"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.textField}
                            value={formik.values.maxUsers}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={formik.touched.maxUsers && Boolean(formik.errors.maxUsers)}
                            helperText={formik.touched.maxUsers && formik.errors.maxUsers}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            label="Category"
                            id="category"
                            name='category'
                            className={classes.textField}
                            value={formik.values.category}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={formik.touched.maxUsers && Boolean(formik.errors.maxUsers)}
                            helperText={formik.touched.maxUsers && formik.errors.maxUsers}
                        >
                            {categorys.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
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
                    <TextField
                        required
                        fullWidth
                        multiline
                        name="welcomeMessage"
                        label="Welcome Message"
                        type="welcomeMessage"
                        id="welcomeMessage"
                        autoComplete="current-welcomeMessage"
                        value={formik.values.welcomeMessage}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.touched.welcomeMessage && Boolean(formik.errors.welcomeMessage)}
                        helperText={formik.touched.welcomeMessage && formik.errors.welcomeMessage}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        multiline
                        name="descirption"
                        label="Descirption"
                        type="descirption"
                        id="descirption"
                        autoComplete="current-descirption"
                        value={formik.values.descirption}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.touched.descirption && Boolean(formik.errors.descirption)}
                        helperText={formik.touched.descirption && formik.errors.descirption}
                    />
                    </Grid>
                    {/* <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                    </Grid> */}
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Create Room
                </Button>
            </form>
        </Card>
        {/* <Box mt={5}>
            <Copyright />
        </Box> */}
        </Container>
    );
}

export default CreateRoom;