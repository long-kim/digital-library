import { Avatar, IconButton } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
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
  user: firebase.User;
}

const UserMenu: React.FC<IUserMenuProps> = ({ user }) => {
  const classes = useStyles();

  return (
    <IconButton color="inherit">
      <Avatar className={classes.avatar} src={user.photoURL!} />
    </IconButton>
  );
};

export default UserMenu;
