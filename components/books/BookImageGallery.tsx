import { ButtonBase, Grid, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
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
      objectPosition: 'center top',
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[3],
    },
    sidePanel: {
      overflowY: 'auto',
      height: 500,
      flexWrap: 'nowrap',
      paddingRight: theme.spacing(2),
    },
    active: {
      '& img': {
        filter: 'unset !important',
      },
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
        filter: 'brightness(0.6)',
        transition: theme.transitions.create('filter'),
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

  const handleImageChange = (index: number) => () => setCurrentImage(index);

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
              className={clsx(classes.sideImg, {
                [classes.active]: idx === currentImage,
              })}
              onClick={handleImageChange(idx)}
              disableRipple
            >
              <LazyLoadImage
                src={imgURL}
                effect="blur"
                height={250}
                width="100%"
              />
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default BookImageGallery;
