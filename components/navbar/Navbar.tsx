import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import firebase from 'firebase/app';
import React from 'react';
import NavLink from './NavLink';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const useStyles = makeStyles(theme =>
  createStyles({
    title: {
      marginRight: theme.spacing(3),
    },
    links: {
      marginRight: 'auto',
    },
    navRight: {
      display: 'flex',
    },
  }),
);

interface INavbarProps {
  page?: string;
  user: firebase.User | undefined;
}

const Navbar: React.FC<INavbarProps> = ({ user }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            DIGITAL LIBRARY
          </Typography>
          <div className={classes.links}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/library">Thư viện</NavLink>
            <NavLink href="/discover">Khám phá</NavLink>
            <NavLink href="/contact">Liên hệ</NavLink>
          </div>
          <SearchBar />
          {user ? (
            <UserMenu user={user} />
          ) : (
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
