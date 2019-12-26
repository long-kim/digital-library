import {
  Avatar,
  Box,
  ButtonBase,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      paddingTop: '2rem',
    },
    title: {
      margin: theme.spacing(0, 0, 3, 2),
      color: '#111111',
    },
    buttonBase: {
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      transition: theme.transitions.create('background-color'),
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    avatar: {
      width: '11.5rem',
      height: '11.5rem',
      marginBottom: theme.spacing(2),
      boxShadow: theme.shadows[2],
    },
  }),
);

interface IFriendItemProps {
  friend: firebase.firestore.DocumentData | undefined;
}

const FriendItem: React.FC<IFriendItemProps> = ({ friend }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {friend && (
        <Link href="/users/[uid]" as={`/users/${friend.uid}`} passHref>
          <ButtonBase className={classes.buttonBase}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Avatar className={classes.avatar} src={friend.photoURL} />
              </Grid>
              <Grid item>
                <Typography variant="h6">{friend.fullName}</Typography>
              </Grid>
            </Grid>
          </ButtonBase>
        </Link>
      )}
    </React.Fragment>
  );
};

interface IMyFriendsProps {
  profileData?: firebase.firestore.DocumentData | null;
  friends: Array<firebase.firestore.DocumentData | undefined> | null;
  setFriends?: (
    friends: Array<firebase.firestore.DocumentData | undefined> | undefined,
  ) => void;
}

const MyFriends: React.FC<IMyFriendsProps> = ({ friends }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container direction="column">
      <Grid item>
        <Typography className={classes.title} variant="h4" gutterBottom>
          Bạn bè
        </Typography>
      </Grid>
      <Grid item container spacing={4} style={{ flexGrow: 1 }}>
        {friends ? (
          friends.length ? (
            friends.map((friend, idx) => (
              <Grid key={idx} item xs={6} lg={4}>
                <FriendItem friend={friend} />
              </Grid>
            ))
          ) : (
            <Grid item container justify="center" alignItems="center">
              <Typography variant="body1">
                Người dùng này chưa kết bạn.
              </Typography>
            </Grid>
          )
        ) : (
          <Grid item container justify="center" alignItems="center">
            <CircularProgress size="3rem" />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default MyFriends;
