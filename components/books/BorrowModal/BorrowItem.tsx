import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IUser } from '../interfaces';
import Link from '../../Link';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      borderRadius: theme.shape.borderRadius,
    },
  }),
);

interface IBorrowItemProps {
  lender: IUser;
}

const BorrowItem: React.FC<IBorrowItemProps> = ({ lender }) => {
  const classes = useStyles();

  return (
    <ListItem
      button
      component={Link}
      href="/users/[uid]"
      as={`/users/${lender.uid}`}
      classes={{ root: classes.root }}
    >
      <ListItemAvatar>
        <Avatar src={lender.photoURL} />
      </ListItemAvatar>
      <ListItemText
        primary={lender.fullName}
        secondary={lender.room ?? 'Không có thông tin'}
      />
      <ListItemSecondaryAction>
        <Button color="primary">Hỏi mượn</Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default BorrowItem;
