import { Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

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
      objectFit: 'contain',
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

const BookImageGallery: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.mainImgWrapper} item md={8}>
        <img
          className={classes.mainImg}
          src="https://salt.tikicdn.com/cache/550x550/media/catalog/product/i/m/img005_14.jpg"
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
            src="https://vcdn.tikicdn.com/ts/review/d5/bf/39/4c7096d12cda96b026b776d561ca67f8.jpg"
          />
        </Grid>
        <Grid item>
          <img
            className={classes.sideImg}
            src="https://vcdn.tikicdn.com/ts/review/4a/17/ef/163b9a6f6bd8815ffb9354ed946e9a31.jpg"
          />
        </Grid>
        <Grid item>
          <img
            className={classes.sideImg}
            src="https://vcdn.tikicdn.com/ts/review/d5/bf/39/4c7096d12cda96b026b776d561ca67f8.jpg"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BookImageGallery;
