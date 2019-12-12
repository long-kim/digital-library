import { Avatar, Box, Grid, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import _ from 'lodash';
import React from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      margin: '0 0 1rem',
      fontWeight: 'bold',
      color: '#111111',
    },
    avatar: {
      width: '11.5rem',
      height: '11.5rem',
    },
    user_name: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.24,
      color: '#3b3b3b',
      marginTop: '0.8rem',
    },
  }),
);

interface friendProps {
  uid: string;
  avatar_url: string;
  username: string;
}
const Friend = (props: friendProps) => {
  const { avatar_url, username } = props;
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar src={avatar_url} className={classes.avatar} />
      <Typography className={classes.user_name}>{username}</Typography>
    </Box>
  );
};

interface myFriendProps {
  friends: friendProps[];
}

const MyFriends = (props: myFriendProps) => {
  const { friends } = props;
  const classes = useStyles();
  return (
    <Box>
      <Typography className={classes.title} variant="h5">
        Bạn bè:
      </Typography>
      <Grid container>
        {friends.map((item, index) => (
          <Grid style={{ margin: '1rem 0' }} key={index} item xs={4}>
            <Friend {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyFriends;
