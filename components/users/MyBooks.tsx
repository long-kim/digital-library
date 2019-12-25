import {
  Avatar,
  ButtonBase,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import React from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

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
    slides: {},
  }),
);

export interface Book {
  id: string;
  data: firebase.firestore.DocumentData | undefined;
}

interface IBookItemProps {
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
              <Grid item>
                <Avatar
                  className={classes.avatar}
                  src={book.data?.img[0]}
                  variant="rounded"
                />
              </Grid>
              <Grid item>
                <Typography variant="h6" align="center">
                  {book.data?.name}
                </Typography>
              </Grid>
            </Grid>
          </ButtonBase>
        </Link>
      )}
    </React.Fragment>
  );
};

interface IMyBooksProps {
  books: Array<Book | undefined> | undefined;
  own?: boolean;
  of?: string;
}

const MyBooks: React.FC<IMyBooksProps> = ({ books, own, of }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container direction="column">
      <Grid item>
        <Typography className={classes.title} variant="h4" gutterBottom>
          {own ? 'Sách của tôi' : `Sách của ${of}`}
        </Typography>
      </Grid>
      <Grid item container spacing={4} style={{ flexGrow: 1 }}>
        {books ? (
          <React.Fragment>
            {books.map((book, idx) => (
              <Grid key={idx} item xs={6} md={4}>
                <BookItem book={book} />
              </Grid>
            ))}
          </React.Fragment>
        ) : (
          <Grid item container justify="center" alignItems="center">
            <CircularProgress size="3rem" />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default MyBooks;
