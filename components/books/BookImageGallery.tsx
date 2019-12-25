import { ButtonBase, Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
      objectPosition: 'left top',
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
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(2),
      boxShadow: theme.shadows[1],
      '& img': {
        borderRadius: theme.shape.borderRadius,
        objectFit: 'cover',
        minHeight: '100%',
      },
    },
  }),
);

interface IBookImageGalleryProps {
  images: string[] | undefined;
}

const BookImageGallery: React.FC<IBookImageGalleryProps> = ({ images }) => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(0);

  const handleImageChange = (index: number) => setCurrentImage(index);

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.mainImgWrapper} item md={8}>
        <img className={classes.mainImg} src={images?.[currentImage]} />
      </Grid>
      <Grid
        className={classes.sidePanel}
        item
        container
        md={4}
        direction="column"
        alignItems="flex-start"
      >
        {images?.map((imgURL, idx) => (
          <Grid key={idx} item container>
            <ButtonBase
              className={classes.sideImg}
              onClick={handleImageChange.bind(null, idx)}
            >
              <LazyLoadImage
                src={imgURL}
                effect="blur"
                height="100%"
                width="100%"
              />
            </ButtonBase>
          </Grid>
        ))}
        {/* <Grid item>
          <img
            className={classes.sideImg}
            src="https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg"
          />
        </Grid>
        <Grid item>
          <img
            className={classes.sideImg}
            src="https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg"
          />
        </Grid>
        <Grid item>
          <img
            className={classes.sideImg}
            src="https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg"
          />
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default BookImageGallery;
