import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import BookItem, { Book } from './BookItem';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      paddingTop: '2rem',
    },
    title: {
      margin: theme.spacing(0, 0, 3, 2),
      color: '#111111',
    },
  }),
);

interface IBorrowedBooksProps {
  books: Array<Book | undefined>;
}

const BorrowedBooks: React.FC<IBorrowedBooksProps> = ({ books }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container direction="column">
      <Grid item>
        <Typography className={classes.title} variant="h4" gutterBottom>
          Sách đã mượn
        </Typography>
      </Grid>
      <Grid item container spacing={4} style={{ flexGrow: 1 }}>
        {books.length ? (
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

export default BorrowedBooks;
