import {
  Box,
  CircularProgress,
  Container,
  Fab,
  Grid,
  Theme,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import BookDetails from '../../components/books/BookDetails';
import BookImageGallery from '../../components/books/BookImageGallery';
import BorrowModal from '../../components/books/BorrowModal';
// import CommentForm from '../../components/books/CommentForm';
import { IBook } from '../../components/books/interfaces';
import RelatedBook, {
  IRelatedBookProps,
} from '../../components/books/RelatedBook';
import { IReviewProps } from '../../components/books/Review';
import Navbar from '../../components/navbar/Navbar';
import { firebaseConfig } from '../../firebase/config';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

const Review = dynamic(() => import('../../components/books/Review'));
const CommentForm = dynamic(() => import('../../components/books/CommentForm'));

const relatedList: IRelatedBookProps[] = [
  {
    name: 'Conan',
    coverURL:
      'https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg',
    id: '5BUoT3T1oSZoJbfLq6TH',
  },
  {
    name: 'Conan',
    coverURL:
      'https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg',
    id: '5BUoT3T1oSZoJbfLq6TH',
  },
  {
    name: 'Conan',
    coverURL:
      'https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg',
    id: '5BUoT3T1oSZoJbfLq6TH',
  },
  {
    name: 'Conan',
    coverURL:
      'https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg',
    id: '5BUoT3T1oSZoJbfLq6TH',
  },
  {
    name: 'Conan',
    coverURL:
      'https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg',
    id: '5BUoT3T1oSZoJbfLq6TH',
  },
  {
    name: 'Conan',
    coverURL:
      'https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg',
    id: '5BUoT3T1oSZoJbfLq6TH',
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bookShowcase: {
      padding: theme.spacing(4, 0),
    },
    addToCartIcon: {
      marginRight: theme.spacing(1),
    },
    linebreak: {
      height: 3,
      width: '100%',
      margin: theme.spacing(8, 0),
      backgroundColor: '#d5cccc',
    },
    reviewsRoot: {
      marginTop: theme.spacing(4),
    },
    relatedBooksContainer: {
      marginTop: theme.spacing(1),
    },
  }),
);

interface BookShowProps {
  book?: IBook | undefined;
  bookId?: string;
}

const BookShow: NextPage<BookShowProps> = ({ book, bookId }) => {
  const [user, _, handleLogout] = useFirebaseAuth(firebaseConfig);
  const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState<IReviewProps[] | null>(null);

  const classes = useStyles();

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.firestore();
    return db
      .collection('reviews')
      .where('book', '==', bookId)
      .onSnapshot(
        snapshot =>
          Promise.all(
            snapshot.docs.map(doc => {
              const userRef: firebase.firestore.DocumentReference = doc.get(
                'user',
              );
              return userRef?.get().then(userSnapshot => ({
                ...doc.data(),
                user: userSnapshot.data(),
              }));
            }),
          )
            .then((fetchedReviews: IReviewProps[]) =>
              setReviews(fetchedReviews),
            )
            .catch(error => {
              throw error;
            }),
        err => console.error(err),
      );
  }, []);

  const handleClickOpen = () => setModalOpen(true);

  const handleClose = () => setModalOpen(false);

  return (
    <React.Fragment>
      <Head>
        <title>{`${book?.name} | Digital Library`}</title>
      </Head>
      <Navbar user={user} handleLogout={handleLogout} />
      <Container className={classes.bookShowcase} maxWidth="lg">
        <Grid container spacing={6}>
          <Grid
            item
            container
            xs={6}
            direction="column"
            justify="space-between"
          >
            <BookDetails book={book} />
            <Grid item container justify="flex-end">
              <Fab variant="extended" color="primary" onClick={handleClickOpen}>
                <AddShoppingCartIcon
                  className={classes.addToCartIcon}
                  fontSize="small"
                />
                Thêm vào giỏ
              </Fab>
              <BorrowModal
                onClose={handleClose}
                open={modalOpen}
                bookId={bookId}
              />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <BookImageGallery images={book?.img} />
          </Grid>
        </Grid>
        <Grid item className={classes.linebreak} />
        <Grid container spacing={6}>
          <Grid item container md={6} direction="column">
            <Grid item>
              <CommentForm bookId={bookId} currentUid={user?.uid} />
            </Grid>
            <Grid container component={Box} justifyContent="center">
              {reviews ? (
                reviews.length ? (
                  reviews.map(({ user: reviewUser, rating, content }, idx) => (
                    <Grid key={idx} item container>
                      <Review
                        user={reviewUser}
                        rating={rating}
                        content={content}
                      />
                    </Grid>
                  ))
                ) : (
                  <Box marginTop={2}>
                    <Typography variant="body1">
                      Chưa có review nào. Bạn có muốn viết?
                    </Typography>
                  </Box>
                )
              ) : (
                <Box alignSelf="center" marginTop={6}>
                  <CircularProgress />
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid item container md={6} direction="column">
            <Grid item>
              <Typography variant="h5">Tác phẩm liên quan</Typography>
            </Grid>
            <Grid
              className={classes.relatedBooksContainer}
              item
              container
              spacing={3}
            >
              {relatedList.map(({ id, name, coverURL }, idx) => (
                <Grid key={idx} item md={6} lg={4}>
                  <RelatedBook id={id} name={name} coverURL={coverURL} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

BookShow.getInitialProps = async ({ query }) => {
  const { bookId } = query;

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();
  const bookSnapshot = await db
    .collection('books')
    .doc(bookId as string)
    .get();

  const { reviews, ...book } = bookSnapshot.data() as IBook;

  return { book, bookId: bookId as string };
};

export default BookShow;
