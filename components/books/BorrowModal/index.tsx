import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  Theme,
  Typography,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import BorrowItem from './BorrowItem';
import { IUser } from '../interfaces';
import React, { useEffect, useState } from 'react';
import { firebaseConfig } from '../../../firebase/config';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { from, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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
  const classes = useStyles();

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.firestore();
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

  return (
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
            <Button variant="contained" color="primary" size="large" fullWidth>
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
                  Hiện có {bookLenders.length} thành viên sẵn sàng cho bạn mượn
                  cuốn sách này
                </Typography>
              </Grid>
              <Grid className={classes.lenderListRoot} item component={List}>
                {bookLenders.map(({ user }, idx) => (
                  <BorrowItem key={idx} lender={user} />
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
  );
};

export default BorrowModal;
