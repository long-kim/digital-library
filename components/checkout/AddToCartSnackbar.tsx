import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import ButtonLink from '../index/ButtonLink';

interface SnackbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddToCartSnackbar: React.FC<SnackbarProps> = ({ open, setOpen }) => {
  const handleClose = (
    _event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => reason !== 'clickaway' && setOpen(false);

  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      autoHideDuration={6000}
      open={open}
      onClose={handleClose}
      message="Đã thêm vào giỏ"
      action={[
        <ButtonLink key="cart" href="/checkout" color="inherit" size="small">
          Xem giỏ hàng
        </ButtonLink>,
        <IconButton key="close" onClick={handleClose} color="inherit">
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};

export default AddToCartSnackbar;
