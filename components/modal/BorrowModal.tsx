import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Box, Typography, Button } from '@material-ui/core';
import IBorrow from './IBorrow';
import BorrowOption from './BorrowOption';

const MAIN_COLOR = '#494848';
const BTN_COLOR = '#8d8585';

const modalCenter = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      position: 'absolute',
      width: '500px',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),

      color: MAIN_COLOR,
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      marginBottom: '25px',
    },
    btn: {
      fontSize: '15px',
      margin: '10px 10px',
      padding: '14px 25px',
      fontWeight: 'bold',
      color: MAIN_COLOR,
      textTransform: 'none',
    },
    outlinedBtn: {
      borderColor: BTN_COLOR,
    },
    containedBtn: {
      backgroundColor: BTN_COLOR,
      color: '#fff',
    },
    textLowOpacity: {
      opacity: '0.75',
    },
    borrowerContainer: {
      margin: '10px 0',
      maxHeight: '316px',
      overflowY: 'scroll',
    },
  }),
);

interface IProps {
  list: Array<IBorrow>;
  styles?: any; // Styling button
}

const BorrowModal: React.FC<IProps> = ({ list, styles }) => {
  const classes = useStyles();

  const [modalStyle] = React.useState(modalCenter);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderBorrower = list.map((borrower: IBorrow, i) => {
    return (
      <BorrowOption
        key={i}
        fullname={borrower.fullname}
        uid={borrower.uid}
        bid={borrower.bid}
      ></BorrowOption>
    );
  });

  const handleAdd = () => {
    // TODO: Add to shelf
  };

  const handleShare = () => {
    // TODO: Share to FB
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleOpen} className={styles}>
        Thêm vào giỏ
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-content"
        open={open}
        onClose={handleClose}
      >
        <Box className={classes.modal} style={modalStyle}>
          <Box>
            <Box className={classes.btnContainer}>
              <Button
                variant="contained"
                className={`${classes.btn} ${classes.containedBtn}`}
                onClick={handleAdd}
              >
                Thêm vào tủ sách
              </Button>
              <Button
                variant="outlined"
                className={`${classes.btn} ${classes.outlinedBtn}`}
                onClick={handleShare}
              >
                Chia sẻ lên Facebook
              </Button>
            </Box>
            <Typography variant="h6">Các thành viên đang chia sẻ</Typography>
            <Typography className={classes.textLowOpacity}>
              Hiện có {list.length} thành viên sẵn sàng cho bạn mượn cuốn sách
              này
            </Typography>
            <Box className={classes.borrowerContainer}>{renderBorrower}</Box>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default BorrowModal;
