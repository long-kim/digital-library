import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import SocialLogin from '../components/auth/SocialLogin';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import { firebaseConfig } from '../firebase/config';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 'calc(100vh - 64px)',
      backgroundImage: 'url("/img/signup.jpg");',
      backgroundSize: 'cover',
    },
    pane: {
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[6],
      padding: theme.spacing(4, 8),
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(3),
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('xl')]: {
          marginBottom: theme.spacing(3),
        },
      },
    },
    signupButton: {
      marginTop: theme.spacing(1),
      [theme.breakpoints.up('xl')]: {
        marginTop: theme.spacing(3),
      },
    },
    socialSignIn: {
      marginTop: theme.spacing(2),
    },
    red: {
      color: theme.palette.error.main,
    },
  }),
);

interface ISignupFormValues {
  email: string;
  password: string;
  rePassword: string;
}

const SignIn: NextPage = () => {
  const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);
  const classes = useStyles();
  const initialValues: ISignupFormValues = {
    email: '',
    password: '',
    rePassword: '',
  };

  const renderSignUpForm = (props: FormikProps<ISignupFormValues>) => {
    const { errors, values } = props;

    return (
      <form className={classes.form} action="/api/login" method="post">
        <TextField variant="outlined" label="Email" autoComplete="email" />
        <TextField
          variant="outlined"
          label="Mật khẩu"
          type="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="agree" color="primary" />}
          label="Lưu thông tin"
        />
        <Button
          className={classes.signupButton}
          size="large"
          type="submit"
          variant="contained"
          color="secondary"
        >
          ĐĂNG NHẬP
        </Button>
      </form>
    );
  };

  const handleSubmit = (
    values: ISignupFormValues,
    actions: FormikHelpers<ISignupFormValues>,
  ) => {
    actions.setSubmitting(false);
  };

  return (
    <React.Fragment>
      <Head>
        <title>{`Đăng ký | ${process.env.APP_NAME}`}</title>
      </Head>
      <Navbar user={user} handleLogout={handleLogout} />
      <Grid className={classes.root} container justify="flex-end">
        <Grid
          className={classes.pane}
          container
          direction="column"
          justify="center"
          item
          xs={6}
          md={4}
        >
          <Typography align="center" variant="h4">
            Đăng nhập
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={renderSignUpForm}
          />
          <SocialLogin />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SignIn;
