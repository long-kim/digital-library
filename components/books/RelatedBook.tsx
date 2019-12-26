import { ButtonBase, fade, Grid, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import Link from 'next/link';
import React, { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(2),
    },
    root: {
      position: 'relative',
      marginBottom: theme.spacing(),
      boxShadow: theme.shadows[1],
      borderRadius: theme.shape.borderRadius,
    },
    bookCoverImage: {
      width: '100%',
      height: 260,
      borderRadius: theme.shape.borderRadius,
    },
    addToCartRoot: {
      position: 'absolute',
      bottom: '0',
      zIndex: 2,
      height: 60,
      backdropFilter: 'blur(2px)',
      borderRadius: theme.shape.borderRadius,
    },
    addToCartButton: {
      width: '100%',
      backgroundColor: fade(theme.palette.common.black, 0.4),
      color: '#bcb6b6',
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
    },
  }),
);

export interface IRelatedBookProps {
  id: string;
  name: string;
  coverURL?: string;
}

const RelatedBook: React.FC<IRelatedBookProps> = ({ id, coverURL, name }) => {
  const classes = useStyles();
  const [showAddToCart, setShowAddToCart] = useState(false);

  const handleAddToCartMouseDown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => e.stopPropagation();

  const handleAddToCartClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
  };

  return (
    <Grid className={classes.container} container direction="column">
      <Link href="/books/[bookId]" as={`/books/${id}`} passHref>
        <ButtonBase className={classes.root}>
          <img className={classes.bookCoverImage} src={coverURL} />
          <Grid className={classes.addToCartRoot} container justify="center">
            <Grid item container>
              <ButtonBase
                className={classes.addToCartButton}
                onMouseDown={handleAddToCartMouseDown}
                onClick={handleAddToCartClick}
              >
                <Typography variant="button">Thêm vào giỏ</Typography>
              </ButtonBase>
            </Grid>
          </Grid>
        </ButtonBase>
      </Link>
      <Typography variant="h6">{name}</Typography>
    </Grid>
  );
};

export default RelatedBook;
