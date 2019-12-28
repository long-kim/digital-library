import {
  Avatar,
  Button,
  ButtonBase,
  CircularProgress,
  fade,
  Grid,
} from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { concat, from, throwError } from 'rxjs';
import {
  catchError,
  concatMap,
  defaultIfEmpty,
  flatMap,
  map,
  tap,
} from 'rxjs/operators';
import ButtonLink from '../components/index/ButtonLink';
import Navbar from '../components/navbar/Navbar';
import { firebaseConfig } from '../firebase/config';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cover: {
      marginTop: -48,
      [theme.breakpoints.up('sm')]: {
        marginTop: -64,
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        filter: 'brightness(0.4)',
        backgroundImage: `url("img/home/cover.jpg")`,
        backgroundSize: 'cover',
        backgroundPositionY: '50%',
        zIndex: -1,
      },
    },
    title: {
      color: '#fff',
    },
    subtitle: {
      color: '#bbb',
      marginBottom: theme.spacing(1),
    },
    joinButton: {
      color: '#bbb',
      borderRadius: '50rem',
      padding: theme.spacing(1, 4),
      borderColor: '#e2e2e2',
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.1),
      },
    },
    profileButton: {
      borderRadius: '50rem',
      padding: theme.spacing(1, 4),
    },
    booksContainer: {
      paddingBottom: theme.spacing(6),
    },
    booksTitle: {
      padding: theme.spacing(6, 0, 3, 3),
    },
    bookRoot: {
      borderRadius: theme.shape.borderRadius,
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.1),
      },
    },
    bookImageButtonRoot: {
      height: '100%',
      width: '100%',
    },
    bookImage: {
      margin: theme.spacing(3),
      height: 380,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[2],
      overflow: 'hidden',
      width: '100%',
    },
    bookAvatar: {
      height: 380,
      minWidth: '100%',
    },
    bookTitle: {
      fontWeight: 'bold',
    },
    addToCartButton: {
      borderColor: '#e2e2e2',
      color: '#777777',
      borderRadius: '50rem',
      padding: theme.spacing(1, 2),
      transition: theme.transitions.create(['color', 'border-color']),
      zIndex: 2,
      marginBottom: theme.spacing(2),
      '&:hover': {
        color: '#555555',
        borderColor: '#bbbbbb',
        backgroundColor: fade(theme.palette.common.white, 0.1),
      },
    },
  }),
);

interface IHomeProps {
  pathname?: string;
  books?: IBookItem[];
}

interface IBookItem {
  id: string | number;
  name: string;
  img: string;
}

interface IBookItemProps {
  product: {
    id: string | number;
    name: string;
    img: string[];
  };
}

const BookItem: React.FC<IBookItemProps> = ({ product: { name, img, id } }) => {
  const classes = useStyles();

  const handleAddToCartClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => e.stopPropagation();

  return (
    <Grid className={classes.bookRoot} item xs={12} sm={6} md={4} lg={3}>
      <Grid container direction="column" alignItems="center">
        <Grid className={classes.bookImage} item>
          <NextLink href="/books/[bookId]" as={`/books/${id}`} passHref>
            <ButtonBase className={classes.bookImageButtonRoot}>
              <Avatar
                className={classes.bookAvatar}
                src={img?.[0]}
                variant="rounded"
              />
            </ButtonBase>
          </NextLink>
        </Grid>
        <Grid item>
          <Typography variant="h6" align="center" gutterBottom>
            {name}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            className={classes.addToCartButton}
            onMouseDown={handleAddToCartClick}
            variant="outlined"
          >
            THÊM VÀO GIỎ
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Index: NextPage<IHomeProps> = ({ pathname }) => {
  const classes = useStyles();
  const [user, , handleLogout] = useFirebaseAuth(firebaseConfig);
  const [books, setBooks] = useState<any[] | null>(null);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    const booksSubscription = from(
      db
        .collection('books')
        .orderBy('rating', 'desc')
        .limit(8)
        .get(),
    )
      .pipe(
        map(items => items.docs),
        map(docs => docs.map(doc => ({ id: doc.id, ...doc.data() }))),
        tap(_ => console.log(_)),
        defaultIfEmpty([]),
        catchError(err => throwError(err)),
      )
      .subscribe(
        newBooks => setBooks(newBooks),
        err => console.error(err),
      );

    return () => booksSubscription.unsubscribe();
  }, [user]);

  return (
    <React.Fragment>
      <Head>
        <title>Trang chủ | Digital Library</title>
      </Head>
      <Navbar page={pathname} user={user} handleLogout={handleLogout} />
      <Box
        className={classes.cover}
        height="100vh"
        display="flex"
        alignItems="center"
      >
        <Container maxWidth="md">
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
            spacing={2}
            className="cover"
          >
            <Grid className={classes.title} item>
              <Typography
                className={classes.title}
                variant="h2"
                color="textPrimary"
                align="center"
                gutterBottom
              >
                Sách dành cho tất cả mọi người
              </Typography>
            </Grid>
            <Grid
              className={classes.subtitle}
              item
              component={Typography}
              variant="h5"
              color="secondary"
              align="center"
            >
              Chào mừng bạn đã đến với thư viện điện tử do nhóm sinh viên đến từ
              trường ĐH Bách Khoa HCM thực hiện
            </Grid>
            <Grid item container justify="center" spacing={2}>
              {user ? (
                <React.Fragment>
                  <Grid item>
                    <ButtonLink
                      className={classes.joinButton}
                      variant="outlined"
                      href="/category"
                    >
                      Đi tới thư viện
                    </ButtonLink>
                  </Grid>
                  <Grid item>
                    <ButtonLink
                      className={classes.profileButton}
                      variant="contained"
                      color="primary"
                      href="/users/[uid]"
                      as={`/users/${user.uid}`}
                    >
                      Trang của tôi
                    </ButtonLink>
                  </Grid>
                </React.Fragment>
              ) : (
                <Grid item>
                  <ButtonLink
                    className={classes.joinButton}
                    variant="outlined"
                    href="/signup"
                  >
                    Tham gia ngay
                  </ButtonLink>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg" className={classes.booksContainer}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography className={classes.booksTitle} variant="h4">
              Sách hay trong tuần:
            </Typography>
          </Grid>
          <Grid item container spacing={4}>
            {books ? (
              books.map((book, idx) => <BookItem key={idx} product={book} />)
            ) : (
              <Box display="flex" justifyContent="center" my={4} width="100%">
                <CircularProgress />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Index;
