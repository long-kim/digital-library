import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NavLink from './NavLink';
import SearchBar from './SearchBar';

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
}

const Navbar: React.FC<INavbarProps> = props => {
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
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
