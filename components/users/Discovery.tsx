import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import BookItem, { Book } from './BookItem';

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      padding: '2rem 0',
    },
    root: {
      paddingBottom: '1rem',
    },
    title: {
      margin: theme.spacing(0, 0, 3, 2),
      paddingRight: theme.spacing(3),
      color: '#111111',
    },
  }),
);

interface IDiscoveryProps {
  weekly: Book[] | null;
  recommended: Book[] | null;
}

const Discovery: React.FC<IDiscoveryProps> = ({ weekly, recommended }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container direction="column">
      <Grid
        className={classes.root}
        container
        direction="column"
        component={Box}
        flexGrow={1}
      >
        <Grid
          className={classes.title}
          item
          container
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Sách hay trong tuần
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="text" color="primary" size="large">
              Xem thêm
            </Button>
          </Grid>
        </Grid>
        <Grid item container spacing={4} style={{ flexGrow: 1 }}>
          {weekly ? (
            weekly.length ? (
              <React.Fragment>
                {weekly.map((book, idx) => (
                  <Grid key={idx} item xs={6} md={4}>
                    <BookItem book={book} />
                  </Grid>
                ))}
              </React.Fragment>
            ) : (
              <Box alignItems="center">
                <Typography variant="body1">Nothing</Typography>
              </Box>
            )
          ) : (
            <Grid item container justify="center" alignItems="center">
              <CircularProgress size="3rem" />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid
        className={classes.root}
        container
        direction="column"
        component={Box}
        flexGrow={1}
      >
        <Grid
          className={classes.title}
          item
          container
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Gợi ý
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="text" color="primary" size="large">
              Xem thêm
            </Button>
          </Grid>
        </Grid>
        <Grid item container spacing={4} style={{ flexGrow: 1 }}>
          {recommended ? (
            recommended.length ? (
              <React.Fragment>
                {recommended.map((book, idx) => (
                  <Grid key={idx} item xs={6} md={4}>
                    <BookItem book={book} />
                  </Grid>
                ))}
              </React.Fragment>
            ) : (
              <Box alignItems="center">
                <Typography variant="body1">Nothing</Typography>
              </Box>
            )
          ) : (
            <Grid item container justify="center" alignItems="center">
              <CircularProgress size="3rem" />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Discovery;
