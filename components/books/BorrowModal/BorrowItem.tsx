import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Link
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';
import { IUser } from '../interfaces';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingLeft: 0,
    },
  }),
);

interface IBorrowItemProps {
  user: IUser;
}

const BorrowItem: React.FC<IBorrowItemProps> = ({ user }) => {
  const classes = useStyles();

  return (
    <ListItem classes={{ root: classes.root }}>
      <Link href="/profile">
        <ListItemAvatar>
          <Avatar src={user.imageURL} />
        </ListItemAvatar>
      </Link>
      <ListItemText primary={user.name} secondary="Gold Member" />
      <ListItemSecondaryAction>
        <Button href="/checkout" color="primary">Hỏi mượn</Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default BorrowItem;
