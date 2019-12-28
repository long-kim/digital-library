import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Link from '../../Link';
import { IUser } from '../interfaces';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      borderRadius: theme.shape.borderRadius,
    },
  }),
);

interface IBorrowItemProps {
  lender: IUser;
  checkedLenders: string[];
  handleToggle: (value: string) => () => void;
}

const BorrowItem: React.FC<IBorrowItemProps> = ({
  lender,
  handleToggle,
  checkedLenders,
}) => {
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
        <FormControlLabel
          control={
            <Checkbox
              edge="start"
              color="primary"
              onChange={handleToggle(lender.uid)}
              checked={checkedLenders.indexOf(lender.uid) !== -1}
            />
          }
          label="Hỏi mượn"
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default BorrowItem;
