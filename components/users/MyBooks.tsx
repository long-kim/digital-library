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
