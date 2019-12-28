import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { concat, forkJoin, from, of, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  catchError,
  defaultIfEmpty,
  flatMap,
  map,
  merge,
  take,
  tap,
  throwIfEmpty,
} from 'rxjs/operators';
import Navbar from '../components/navbar/Navbar';
import { firebaseConfig } from '../firebase/config';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

const useStyles = makeStyles(theme =>
  createStyles({
    tableHead: {
      fontWeight: 'bold',
    },
  }),
);

export const StyledTableCell = withStyles(theme =>
  createStyles({
    head: {
      fontWeight: 'bold',
    },
  }),
)(TableCell);

const CheckOut: NextPage = () => {
  const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);
  const [rentItems, setRentItems] = useState<any[] | null>(null);
  const classes = useStyles();

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    if (user) {
      from(
        db
          .collection('rents')
          .where('to', '==', user.uid)
          .where('status', '==', 0)
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
          items => setRentItems(items),
          err => console.error(err),
        );
    }
  }, [user]);

  return (
    <React.Fragment>
      <Navbar user={user} handleLogout={handleLogout} />
      <Container>
        <Box my={4}>
          <Grid container direction="column" spacing={4}>
            <Grid item component={Box} px={2} mt={4}>
              <Typography variant="h5">Giỏ hàng của tôi</Typography>
            </Grid>
            <Grid
              item
              component={Box}
              padding={2}
              bgcolor="grey.100"
              borderRadius="borderRadius"
            >
              {rentItems ? (
                <TableContainer component={Paper}>
                  <Table aria-label="checkout table">
                    <TableHead classes={{ root: classes.tableHead }}>
                      <TableRow>
                        <StyledTableCell>STT</StyledTableCell>
                        <StyledTableCell align="center">
                          Tên sách
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Người cho mượn
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Thời gian cho mượn
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rentItems.length ? (
                        rentItems.map(({ data, user: lender, book }, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell align="center">{book.name}</TableCell>
                            <TableCell align="center">
                              {lender.fullName}
                            </TableCell>
                            <TableCell align="right">{`${data.duration} ngày`}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            Bạn chưa có cuốn sách nào trong giỏ hàng.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box display="flex" justifyContent="center" my={4}>
                  <CircularProgress />
                </Box>
              )}
            </Grid>
            <Grid item container justify="flex-end" spacing={2}>
              <Grid item>
                <Button variant="outlined" color="primary">
                  TIẾP TỤC TÌM SÁCH
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">
                  ĐĂNG KÝ MƯỢN
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box my={4}>
          <Grid container direction="column" spacing={4}>
            <Grid item component={Box} px={2} mt={4}>
              <Typography variant="h5">Bạn có thể đã bỏ lỡ...</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default CheckOut;
