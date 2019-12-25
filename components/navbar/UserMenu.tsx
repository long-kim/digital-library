import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MenuItemProps } from '@material-ui/core/MenuItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import firebase from 'firebase/app';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const useStyles = makeStyles(theme =>
  createStyles({
    avatar: {
      width: 32,
      height: 32,
    },
  }),
);

interface IUserPopupMenuProps {
  anchorEl: Element | null;
  handleClose: () => void;
  user: firebase.User;
  handleLogout: () => void;
}

const UserPopupMenu: React.FC<IUserPopupMenuProps> = ({
  anchorEl,
  handleClose,
  handleLogout,
  user,
}) => {
  const router = useRouter();

  const handleLogoutClick = () => {
    handleLogout();
    handleClose();
  };

  const handleProfileClick = () =>
    router.push('/users/[uid]', `/users/${user.uid}`);

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      getContentAnchorEl={null}
    >
      <MenuItem onClick={handleProfileClick}>Trang của tôi</MenuItem>
      <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
    </Menu>
  );
};

interface IUserMenuProps {
  user: firebase.User | undefined;
  handleLogout: () => Promise<void>;
}

const UserMenu: React.FC<IUserMenuProps> = ({ user, handleLogout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <React.Fragment>
      <IconButton color="inherit" onClick={handleClick}>
        {user ? (
          <Avatar className={classes.avatar} src={user.photoURL!} />
        ) : (
          <Avatar className={classes.avatar}>
            <AccountCircle />
          </Avatar>
        )}
      </IconButton>
      {user && (
        <UserPopupMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          user={user}
          handleLogout={handleLogout}
        />
      )}
    </React.Fragment>
  );
};

export default UserMenu;
