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
import useFirebaseAuth from '../hooks/useFirebaseAuth';

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

const Library: NextPage<IHomeProps> = ({ pathname }) => {
  const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);

  return (
    <React.Fragment>
      <Navbar page={pathname} user={user} />
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Library
          </Typography>
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
};

Library.getInitialProps = async ctx => {
  const pathname = ctx.pathname ? ctx.pathname : '/';
  return { pathname };
};

export default Library;
