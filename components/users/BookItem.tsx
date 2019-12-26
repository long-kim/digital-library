import { Avatar, ButtonBase, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import _ from 'lodash';
import Link from 'next/link';
import React from 'react';

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
      height: 300,
      width: '100%',
      marginBottom: theme.spacing(3),
      boxShadow: theme.shadows[2],
    },
    bookTitle: {
      height: `calc(${theme.typography.h6.fontSize} * ${theme.typography.h6.lineHeight} * 2)`,
    },
  }),
);

export interface Book {
  id: string;
  data: firebase.firestore.DocumentData | undefined;
}

export interface IBookItemProps {
  book: Book | undefined;
}

const BookItem: React.FC<IBookItemProps> = ({ book }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {book && (
        <Link href="/books/[bookId]" as={`/books/${book.id}`} passHref>
          <ButtonBase className={classes.buttonBase}>
            <Grid container direction="column" alignItems="center">
              <Grid item container>
                <Avatar
                  className={classes.avatar}
                  src={book.data?.img?.[0]}
                  variant="rounded"
                >
                  <LibraryBooksIcon fontSize="large" />
                </Avatar>
              </Grid>
              <Grid item className={classes.bookTitle}>
                <Typography variant="h6" align="center">
                  {_.truncate(book.data?.name, { length: 36 })}
                </Typography>
              </Grid>
            </Grid>
          </ButtonBase>
        </Link>
      )}
    </React.Fragment>
  );
};

export default BookItem;
