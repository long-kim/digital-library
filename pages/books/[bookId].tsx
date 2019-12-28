import { Container, Fab, Grid, Theme, Typography } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { createStyles, makeStyles } from '@material-ui/styles';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import BookDetails from '../../components/books/BookDetails';
import BookImageGallery from '../../components/books/BookImageGallery';
import BorrowModal from '../../components/books/BorrowModal';
import CommentForm from '../../components/books/CommentForm';
import { IBook } from '../../components/books/interfaces';
import RelatedBook, {
  IRelatedBookProps,
} from '../../components/books/RelatedBook';
import Review, { IReviewProps } from '../../components/books/Review';
import Navbar from '../../components/navbar/Navbar';
import { firebaseConfig } from '../../firebase/config';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

const reviews: IReviewProps[] = [
  {
    user: {
      name: 'Thinh Tran',
      imageURL:
        'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74443688_2387688291469423_6786064012900564992_o.jpg?_nc_cat=100&_nc_ohc=rMsccGHD9w0AQnU7Vlu8mAB5VRcugTbk-TA09KLB3spkfF8Xc31qCVF7g&_nc_ht=scontent.fsgn1-1.fna&oh=99a82a9d3d8844fbf955af48ce53421a&oe=5E7EF970',
    },
    review:
      'However, they commented that it did tend to lag, especially at the end where two bad guys',
    rating: 4,
  },
  {
    user: {
      name: 'Thinh Tran',
      imageURL:
        'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74443688_2387688291469423_6786064012900564992_o.jpg?_nc_cat=100&_nc_ohc=rMsccGHD9w0AQnU7Vlu8mAB5VRcugTbk-TA09KLB3spkfF8Xc31qCVF7g&_nc_ht=scontent.fsgn1-1.fna&oh=99a82a9d3d8844fbf955af48ce53421a&oe=5E7EF970',
    },
    review:
      'However, they commented that it did tend to lag, especially at the end where two bad guys',
    rating: 4,
  },
  {
    user: {
      name: 'Thinh Tran',
      imageURL:
        'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74443688_2387688291469423_6786064012900564992_o.jpg?_nc_cat=100&_nc_ohc=rMsccGHD9w0AQnU7Vlu8mAB5VRcugTbk-TA09KLB3spkfF8Xc31qCVF7g&_nc_ht=scontent.fsgn1-1.fna&oh=99a82a9d3d8844fbf955af48ce53421a&oe=5E7EF970',
    },
    review:
      'However, they commented that it did tend to lag, especially at the end where two bad guys',
    rating: 4,
  },
];

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

interface IBookShowProps {
  book?: IBook | undefined;
  bookId?: any;
}

const BookShow: NextPage<IBookShowProps> = ({ book, bookId }) => {
  const [user, , handleLogout] = useFirebaseAuth(firebaseConfig);
  const [response, setResponse] = useState<Array<any>>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => setModalOpen(true);

  const handleClose = () => setModalOpen(false);

  // console.log(book && book.cate[0]);

  const getCateItemList = () => {
    // Initialize DB and Storage
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();
    // const storageRef = firebase.storage().ref();
    let data: Array<any> = [];

    if (book) {
      db.collection('books')
        .where('cate', 'array-contains', book.cate[0])
        .limit(6)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.id !== bookId) {
              data.push({
                data: doc.data(),
                id: doc.id,
              });
            }
          });
          setResponse(data);
        });
    }
  };

  useEffect(getCateItemList, [bookId]);

  return (
    <React.Fragment>
      <Head>
        <title>Trang chủ | Digital Library</title>
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
              <BorrowModal onClose={handleClose} open={modalOpen} />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <BookImageGallery book={book} />
          </Grid>
        </Grid>
        <Grid item className={classes.linebreak} />
        <Grid container spacing={6}>
          <Grid item container md={6} direction="column">
            <Grid item>
              <CommentForm />
            </Grid>
            {reviews.map(({ user: reviewUser, rating, review }, idx) => (
              <Grid key={idx} item>
                <Review user={reviewUser} rating={rating} review={review} />
              </Grid>
            ))}
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
              {response.map((book : IBook, i:any) => (
                <Grid key={i} item md={6} lg={4}>
                  <RelatedBook id={book.id} name={book.data.name} coverURL={book.data.img[0]} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* <BookDetails /> */}
      {/* <Footer /> */}
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

  const book = bookSnapshot.data() as IBook;

  return { book,bookId };
};

export default BookShow;
