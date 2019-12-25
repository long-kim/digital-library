import { Avatar, Grid, Theme, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';
import Link from '../Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
      '&:first-child': {
        marginTop: theme.spacing(4),
      },
    },
    avatar: {
      width: 56,
      height: 56,
      marginRight: theme.spacing(2),
      boxShadow: theme.shadows[1],
    },
    review: {
      marginTop: theme.spacing(1),
      color: '#939393',
    },
  }),
);

interface User {
  name: string;
  imageURL?: string;
}

export interface IReviewProps {
  user: firebase.firestore.DocumentData;
  content: string;
  rating: number;
}

const Review: React.FC<IReviewProps> = ({ user, rating, content }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container direction="column">
      <Grid item container direction="row">
        <Grid item>
          <Avatar className={classes.avatar} src={user.photoURL} />
        </Grid>
        <Grid item>
          <Grid item>
            <Link href="/users/[uid]" as={`/users/${user.uid}`}>
              <Typography variant="h6">{user.fullName}</Typography>
            </Link>
            <Rating readOnly value={rating} size="small" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography className={classes.review} variant="body1" align="justify">
          {content}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Review;
