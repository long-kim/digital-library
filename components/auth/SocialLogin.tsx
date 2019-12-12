import {
  Button,
  darken,
  Grid,
  Icon,
  Theme,
  Typography,
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { firebaseConfig } from '../../firebase/config';
import providers from '../../firebase/providers';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';

const FACEBOOK_COLOR = '#3b5998';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    socialSignIn: {
      marginTop: theme.spacing(2),
    },
    facebook: {
      backgroundColor: FACEBOOK_COLOR,
      color: theme.palette.getContrastText(FACEBOOK_COLOR),
      '&:hover': {
        backgroundColor: darken(FACEBOOK_COLOR, 0.25),
      },
    },
    google: {
      backgroundColor: theme.palette.common.white,
      '&:hover': {
        backgroundColor: darken(theme.palette.common.white, 0.1),
      },
    },
    imageIcon: {
      height: '100%',
    },
    iconRoot: {
      display: 'flex',
      textAlign: 'center',
    },
  }),
);

const GoogleIcon: React.FC = () => {
  const classes = useStyles();

  return (
    <Icon classes={{ root: classes.iconRoot }}>
      <img src="/img/google.svg" className={classes.imageIcon} />
    </Icon>
  );
};

const SocialLogin: React.FC = () => {
  const [user, handleLogin] = useFirebaseAuth(firebaseConfig);
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // User is already signed in, go back to previous page
      router.back();
    }
  }, [user]);

  const handleFacebookLogin = () =>
    handleLogin(
      providers.facebookProvider.setCustomParameters({ display: 'popup' }),
    ).catch(error => {
      throw error;
    });
  const handleGoogleLogin = () => handleLogin(providers.googleProvider);

  return (
    <Grid
      className={classes.socialSignIn}
      container
      direction="column"
      justify="center"
      spacing={2}
    >
      <Grid item component={Typography} variant="subtitle2" align="center">
        hoặc đăng nhập bằng
      </Grid>
      <Grid item container spacing={2}>
        <Grid item container xs={6} justify="center">
          <Button
            className={classes.facebook}
            variant="contained"
            startIcon={<FacebookIcon />}
            fullWidth
            onClick={handleFacebookLogin}
          >
            Facebook
          </Button>
        </Grid>
        <Grid item container xs={6} justify="center">
          <Button
            className={classes.google}
            variant="contained"
            startIcon={<GoogleIcon />}
            fullWidth
            onClick={handleGoogleLogin}
          >
            Google
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SocialLogin;
