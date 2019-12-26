import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  Theme,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';
import { IUser } from '../interfaces';
import BorrowItem from './BorrowItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    lenderListRoot: {
      marginTop: theme.spacing(2),
    },
  }),
);

const lenders: IBookLender[] = [
  {
    user: {
      name: 'Thinh Tran',
      imageURL:
        'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74443688_2387688291469423_6786064012900564992_o.jpg?_nc_cat=100&_nc_ohc=rMsccGHD9w0AQnU7Vlu8mAB5VRcugTbk-TA09KLB3spkfF8Xc31qCVF7g&_nc_ht=scontent.fsgn1-1.fna&oh=99a82a9d3d8844fbf955af48ce53421a&oe=5E7EF970',
    },
  },
  {
    user: {
      name: 'Thinh Tran',
      imageURL:
        'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74443688_2387688291469423_6786064012900564992_o.jpg?_nc_cat=100&_nc_ohc=rMsccGHD9w0AQnU7Vlu8mAB5VRcugTbk-TA09KLB3spkfF8Xc31qCVF7g&_nc_ht=scontent.fsgn1-1.fna&oh=99a82a9d3d8844fbf955af48ce53421a&oe=5E7EF970',
    },
  },
  {
    user: {
      name: 'Thinh Tran',
      imageURL:
        'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74443688_2387688291469423_6786064012900564992_o.jpg?_nc_cat=100&_nc_ohc=rMsccGHD9w0AQnU7Vlu8mAB5VRcugTbk-TA09KLB3spkfF8Xc31qCVF7g&_nc_ht=scontent.fsgn1-1.fna&oh=99a82a9d3d8844fbf955af48ce53421a&oe=5E7EF970',
    },
  },
  {
    user: {
      name: 'Thinh Tran',
      imageURL:
        'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74443688_2387688291469423_6786064012900564992_o.jpg?_nc_cat=100&_nc_ohc=rMsccGHD9w0AQnU7Vlu8mAB5VRcugTbk-TA09KLB3spkfF8Xc31qCVF7g&_nc_ht=scontent.fsgn1-1.fna&oh=99a82a9d3d8844fbf955af48ce53421a&oe=5E7EF970',
    },
  },
  {
    user: {
      name: 'Thinh Tran',
      imageURL:
        'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74443688_2387688291469423_6786064012900564992_o.jpg?_nc_cat=100&_nc_ohc=rMsccGHD9w0AQnU7Vlu8mAB5VRcugTbk-TA09KLB3spkfF8Xc31qCVF7g&_nc_ht=scontent.fsgn1-1.fna&oh=99a82a9d3d8844fbf955af48ce53421a&oe=5E7EF970',
    },
  },
  {
    user: {
      name: 'Thinh Tran',
      imageURL:
        'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74443688_2387688291469423_6786064012900564992_o.jpg?_nc_cat=100&_nc_ohc=rMsccGHD9w0AQnU7Vlu8mAB5VRcugTbk-TA09KLB3spkfF8Xc31qCVF7g&_nc_ht=scontent.fsgn1-1.fna&oh=99a82a9d3d8844fbf955af48ce53421a&oe=5E7EF970',
    },
  },
];

interface IBookLender {
  user: IUser;
}

interface IBorrowModalProps {
  open: boolean;
  onClose: () => void;
}

const BorrowModal: React.FC<IBorrowModalProps> = ({ open, onClose }) => {
  const classes = useStyles();

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
        <Grid container direction="column">
          <Grid item container direction="column">
            <Grid item>
              <Typography variant="h6" gutterBottom>
                Các thành viên đang chia sẻ
              </Typography>
              <Typography variant="body1">
                Hiện có {lenders.length} thành viên sẵn sàng cho bạn mượn cuốn
                sách này
              </Typography>
            </Grid>
            <Grid className={classes.lenderListRoot} item component={List}>
              {lenders.map(({ user }, idx) => (
                <BorrowItem key={idx} user={user} />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowModal;
