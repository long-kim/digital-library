import { Avatar, IconButton } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import firebase from 'firebase/app';
import React from 'react';

const useStyles = makeStyles(theme =>
  createStyles({
    avatar: {
      width: 32,
      height: 32,
    },
  }),
);

interface IUserMenuProps {
  user: firebase.User | undefined;
}

const UserMenu: React.FC<IUserMenuProps> = ({ user }) => {
  const classes = useStyles();

  return user ? (
    <IconButton color="inherit">
      <Avatar className={classes.avatar} src={user.photoURL!} />
    </IconButton>
  ) : (
      <IconButton color="inherit">
        <Avatar className={classes.avatar} >
          <AccountCircle />
        </Avatar>
      </IconButton>
    );
};

export default UserMenu;
