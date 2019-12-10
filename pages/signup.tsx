import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { NextPage } from 'next';
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
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
        marginBottom: theme.spacing(3),
      },
    },
    signupButton: {
      marginTop: theme.spacing(3),
    },
    red: {
      color: theme.palette.error.main,
    },
  }),
);

const SignUp: NextPage = () => {
  const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Navbar user={user} />
      <Grid className={classes.root} container justify="flex-end">
        <Grid className={classes.pane} item component={Box} width="35%">
          <Typography align="center" variant="h3">
            Đăng ký
          </Typography>
          <form className={classes.form} action="/api/login" method="post">
            <TextField variant="outlined" label="Email" autoComplete="email" />
            <TextField
              variant="outlined"
              label="Mật khẩu"
              type="password"
              autoComplete="new-password"
            />
            <TextField
              variant="outlined"
              label="Nhập lại mật khẩu"
              type="password"
              autoComplete="new-password"
            />
            <FormControlLabel
              control={<Checkbox value="agree" color="primary" />}
              label={
                <span>
                  Đồng ý với các điều khoản
                  <span className={classes.red}>*</span>
                </span>
              }
            />
            <Button
              className={classes.signupButton}
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
            >
              ĐĂNG KÝ
            </Button>
          </form>
        </Grid>
      </Grid>
      <Footer></Footer>
    </React.Fragment>
  );
};

export default SignUp;
