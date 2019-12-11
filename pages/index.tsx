import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { NextPage } from 'next';
import React from 'react';
import Link from '../components/Link';
import Navbar from '../components/navbar/Navbar';
import ProTip from '../components/ProTip';
import { firebaseConfig } from '../firebase/config';
import useFirebaseAuth from './hooks/useFirebaseAuth';

interface IHomeProps {
  pathname?: string;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://material-ui.com/">
        Your Website
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Index: NextPage<IHomeProps> = ({ pathname }) => {
  const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);

  return (
    <React.Fragment>
      <Navbar page={pathname} user={user} />
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          <Link href="/search" color="secondary">
            Go to the search page
          </Link>
          <br />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Log in
          </Button>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Log out
          </Button>
          {user && (
            <Typography variant="body1">
              Logged is as {`${user!.displayName}`}
            </Typography>
          )}
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
};

Index.getInitialProps = async ctx => {
  return { pathname: ctx.pathname };
};

export default Index;
