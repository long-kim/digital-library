import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
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
      <ListItemAvatar>
        <Avatar src={user.imageURL} />
      </ListItemAvatar>
      <ListItemText primary={user.name} secondary="Gold Member" />
      <ListItemSecondaryAction>
        <Button color="primary">Hỏi mượn</Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default BorrowItem;
