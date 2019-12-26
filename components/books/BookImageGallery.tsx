import { Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';
import {IBook} from './interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 500,
    },
    mainImgWrapper: {
      height: 500,
      paddingRight: theme.spacing(3),
    },
    mainImg: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[3],
    },
    sidePanel: {
      overflowY: 'auto',
      height: 500,
      flexWrap: 'nowrap',
      paddingRight: theme.spacing(2),
    },
    sideImg: {
      height: 250,
      width: '100%',
      objectFit: 'cover',
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(2),
      boxShadow: theme.shadows[1],
    },
  }),
);

interface IBookDetailsProps {
  book: IBook | undefined;
}

const BookImageGallery: React.FC<IBookDetailsProps> = ({ book }) => {
  const classes = useStyles();

  return  (
    <React.Fragment> 
      {book && (
    <Grid className={classes.root} container>
      <Grid className={classes.mainImgWrapper} item md={8}>
        <img
          className={classes.mainImg}
          src={book.img[0]}
        />
      </Grid>
      <Grid
        className={classes.sidePanel}
        item
        container
        md={4}
        direction="column"
        alignItems="flex-start"
      >
        <Grid item>
          <img
            className={classes.sideImg}
            src={book.img[2]}/>
        </Grid>
        <Grid item>
          <img
            className={classes.sideImg}
            src={book.img[1]}/>
        </Grid>
        <Grid item>
          <img
            className={classes.sideImg}
            src={book.img[0]}/>
        </Grid>
      </Grid>
    </Grid>
    )}
    </React.Fragment>
  ); 
};

export default BookImageGallery;
