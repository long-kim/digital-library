import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  Theme,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { from, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, tap } from 'rxjs/operators';
import AppContext from '../../../context/AppContext';
import { firebaseConfig } from '../../../firebase/config';
import AddToCartSnackbar from '../../checkout/AddToCartSnackbar';
import { IUser } from '../interfaces';
import BorrowItem from './BorrowItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // padding: theme.spacing(2),
    },
    lenderListRoot: {
      margin: theme.spacing(2, -2, 0),
    },
  }),
);

interface BookLender extends firebase.firestore.DocumentData {
  user: IUser;
}

interface IBorrowModalProps {
  open: boolean;
  onClose: () => void;
  bookId: string | undefined;
}

const BorrowModal: React.FC<IBorrowModalProps> = ({
  open,
  onClose,
  bookId,
}) => {
  const [bookLenders, setBookLenders] = useState<BookLender[] | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [checkedLenders, setCheckedLenders] = useState<string[]>([]);
  const context = useContext(AppContext);
  const classes = useStyles();

  let db: firebase.firestore.Firestore;

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    db = firebase.firestore();
    from(
      db
        .collection('users')
        .where('books', 'array-contains', db.doc(`books/${bookId}`))
        .get(),
    )
      .pipe(
        map(snapshot =>
          snapshot.docs.map(doc => ({ user: doc.data() as IUser })),
        ),
        tap(lenders => console.log(lenders)),
        catchError(e => throwError(e)),
      )
      .subscribe(lenders => setBookLenders(lenders));
  }, []);

  const handleAddToCart = useCallback(
    () =>
      // TODO: Add to cart
      ajax({
        url: `/api/books/${bookId}/rent`,
        method: 'post',
        body: {
          lenders: checkedLenders,
          uid: context.user?.uid,
        },
      })
        .pipe(
          tap(res => console.log(res)),
          catchError(err => throwError(err)),
        )
        .subscribe(
          res => {
            onClose();
            setSnackbarOpen(true);
          },
          err => console.error(err),
        ),
    [checkedLenders],
  );

  const handleSelectLender = useCallback(
    (value: string) => () => {
      const currentIndex = checkedLenders.indexOf(value);
      const newCheckedLenders = [...checkedLenders];

      if (currentIndex === -1) {
        newCheckedLenders.push(value);
      } else {
        newCheckedLenders.splice(currentIndex, 1);
      }

      setCheckedLenders(newCheckedLenders);
    },
    [checkedLenders],
  );

  return (
    <React.Fragment>
      <Dialog
        className={classes.root}
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleAddToCart}
                disabled={checkedLenders.length === 0}
              >
                Thêm vào tủ sách
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" color="primary" size="large" fullWidth>
                Chia sẻ lên Facebook
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {bookLenders ? (
            <Grid container direction="column">
              <Grid item container direction="column">
                <Grid item>
                  <Typography variant="h6" gutterBottom>
                    Các thành viên đang chia sẻ
                  </Typography>
                  <Typography variant="body1">
                    Hiện có {bookLenders.length} thành viên sẵn sàng cho bạn
                    mượn cuốn sách này
                  </Typography>
                </Grid>
                <Grid className={classes.lenderListRoot} item component={List}>
                  {bookLenders.map(({ user }, idx) => (
                    <BorrowItem
                      key={idx}
                      lender={user}
                      checkedLenders={checkedLenders}
                      handleToggle={handleSelectLender}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
      </Dialog>
      <AddToCartSnackbar open={snackbarOpen} setOpen={setSnackbarOpen} />
    </React.Fragment>
  );
};

export default BorrowModal;
