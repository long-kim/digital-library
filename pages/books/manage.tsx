import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/firestore';
import moment from 'moment';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { forkJoin, from, of, throwError } from 'rxjs';
import { catchError, defaultIfEmpty, flatMap, map, tap } from 'rxjs/operators';
import BorrowedBooks from '../../components/books/manage/BorrowedBooks';
import MyBooks from '../../components/books/manage/MyBooks';
import Navbar from '../../components/navbar/Navbar';
import { firebaseConfig } from '../../firebase/config';
import { RentStatus } from '../api/books/[bookId]/rent';
import { StyledTableCell } from '../checkout';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { TabPanel } from '../users/[uid]';

moment.locale('vi');

export const getDueDate = (
  borrowAt: firebase.firestore.Timestamp,
  duration: number,
) => {
  const borrowDate = borrowAt.toDate();
  return borrowDate.setDate(borrowDate.getDate() + duration);
};

export const getStatus = (status: RentStatus) => {
  switch (status) {
    case RentStatus.Pending:
      return 'Đang chờ';
    case RentStatus.Ongoing:
      return 'Đang mượn';
    case RentStatus.Overdue:
      return 'Quá hạn';
  }
};

const useStyles = makeStyles(theme =>
  createStyles({
    tab: {
      borderBottom: `1px solid ${theme.palette.grey[400]}`,
    },
  }),
);

const BookManagement: NextPage = () => {
  const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);
  const [tab, setTab] = useState(0);
  const [myBooks, setMyBooks] = useState<any[] | null>(null);
  const [borrowedBooks, setBorrowedBooks] = useState<any[] | null>(null);
  const classes = useStyles();

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    if (user) {
      const myBooksSubscription = from(
        db
          .collection('rents')
          .where('from', '==', user.uid)
          .where('status', 'in', [RentStatus.Ongoing, RentStatus.Overdue])
          .get(),
      )
        .pipe(
          map(snapshot => snapshot.docs),
          map(docs => docs.map(doc => doc.data())),
          flatMap(items =>
            forkJoin(
              ...items.map(item =>
                forkJoin({
                  data: of(item),
                  user: from(
                    db
                      .collection('users')
                      .where('uid', '==', item.to)
                      .get(),
                  ).pipe(
                    map(toRef => toRef.docs?.[0]),
                    map(lender => lender.data()),
                  ),
                  book: from(item.bookId.get()).pipe(
                    map((book: firebase.firestore.DocumentSnapshot) =>
                      book.data(),
                    ),
                  ),
                }),
              ),
            ),
          ),
          defaultIfEmpty([]),
          tap(items => console.log(items)),
          catchError(err => throwError(err)),
        )
        .subscribe(
          items => setMyBooks(items),
          err => console.error(err),
        );

      return () => myBooksSubscription.unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    if (user) {
      const myBooksSubscription = from(
        db
          .collection('rents')
          .where('to', '==', user.uid)
          .where('status', 'in', [
            RentStatus.Ongoing,
            RentStatus.Overdue,
            RentStatus.Pending,
          ])
          .get(),
      )
        .pipe(
          map(snapshot => snapshot.docs),
          map(docs => docs.map(doc => doc.data())),
          flatMap(items =>
            forkJoin(
              ...items.map(item =>
                forkJoin({
                  data: of(item),
                  user: from(
                    db
                      .collection('users')
                      .where('uid', '==', item.from)
                      .get(),
                  ).pipe(
                    map(fromRef => fromRef.docs?.[0]),
                    map(lender => lender.data()),
                  ),
                  book: from(item.bookId.get()).pipe(
                    map((book: firebase.firestore.DocumentSnapshot) =>
                      book.data(),
                    ),
                  ),
                }),
              ),
            ),
          ),
          defaultIfEmpty([]),
          tap(items => console.log(items)),
          catchError(err => throwError(err)),
        )
        .subscribe(
          items => setBorrowedBooks(items),
          err => console.error(err),
        );

      return () => myBooksSubscription.unsubscribe();
    }
  }, [user]);

  const handleChange = (_event: React.ChangeEvent, value: number) =>
    setTab(value);

  return (
    <React.Fragment>
      <Navbar user={user} handleLogout={handleLogout} />
      <Container>
        <Box my={2}>
          <Grid container direction="column">
            <Grid item>
              <Tabs
                value={tab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="inherit"
                centered
                classes={{ flexContainer: classes.tab }}
              >
                <Tab label="Sách của tôi" />
                <Tab label="Sách mượn" />
              </Tabs>
            </Grid>
            <Grid item>
              <TabPanel value={tab} index={0}>
                <BorrowedBooks books={borrowedBooks} />
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <MyBooks books={myBooks} />
              </TabPanel>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default BookManagement;
