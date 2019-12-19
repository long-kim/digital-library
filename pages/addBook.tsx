import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import { firebaseConfig } from '../firebase/config';
import Navbar from '../components/navbar/Navbar';

const useStyles = makeStyles(() =>
  createStyles({
    addBook: {
      height: '780px',
      backgroundColor: '#f6f6f6',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: 'Lato',
    },
    addBookContent: {
      backgroundColor: '#ffffff',
      margin: '18px 63px 23px 63px',
      width: '1153px',
      height: '739px',
    },
    addBookTitle: {
      color: '#615e5e',
      fontSize: '36px',
      margin: '23px 0 0 40px',
    },
    addBookSubTitle: {
      color: '#707070',
      fontSize: '13px',
      marginLeft: '40px',
    },
    addBookInfo: {
      margin: '30px 57px 0 109px',
    },
    addBookName: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '29px',
    },
    addBookAuthor: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '29px',
    },
    addBookDiscript: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '29px',
    },
    addBookGenre: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '29px',
    },
    addBookImage: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    addBookInfoName: {
      color: '#615e5e',
      fontSize: '16px',
    },
    addBookImageInput: {
      width: '66px',
      height: '66px',
      backgroundColor: '#dedede',
      border: 'none',
      color: '#615e5e',
      fontSize: '40px',
      marginRight: '23px',
      cursor: 'pointer'
    },
    imageInput: {
        width: '864px'
    },
    addBookInput: {
      width: '864px',
      height: '41px',
      borderRadius: '12px',
      border: 'solid 1px #707070',
      backgroundColor: '#ffffff',
      padding: '3px',
    },
    addBookInputDiscript: {
      width: '864px',
      height: '158px',
      borderRadius: '12px',
      border: 'solid 1px #707070',
      backgroundColor: '#ffffff',
      padding: '3px',
    },
    addBookBtn: {
      width: '172px',
      height: '35px',
      borderRadius: '24px',
      border: 'solid 1px #8d8585',
      backgroundColor: '#8d8585',
      color: '#ffffff',
      fontSize: '16px',
    },
  }),
);

const AddBook: React.FC = () => {
  const classes = useStyles();
  const [user, _, handleLogout] = useFirebaseAuth(firebaseConfig);

  return (
    <div>
      <Navbar page={'/'} user={user} handleLogout={handleLogout} />
      <div className={classes.addBook}>
        <div className={classes.addBookContent}>
          <div className={classes.addBookTitle}>Thêm sách mới</div>
          <div className={classes.addBookSubTitle}>
            Vui lòng điền đầy đủ thông tin về cuốn sách
          </div>
          <div className={classes.addBookInfo}>
            <div className={classes.addBookName}>
              <div className={classes.addBookInfoName}>Tên cuốn sách:</div>
              <input className={classes.addBookInput} />
            </div>
            <div className={classes.addBookAuthor}>
              <div className={classes.addBookInfoName}>Tác giả:</div>
              <input className={classes.addBookInput} />
            </div>
            <div className={classes.addBookDiscript}>
              <div className={classes.addBookInfoName}>Mô tả:</div>
              <input className={classes.addBookInputDiscript} />
            </div>
            <div className={classes.addBookGenre}>
              <div className={classes.addBookInfoName}>Thể loại:</div>
              <input className={classes.addBookInput} />
            </div>
            <div className={classes.addBookImage}>
              <div className={classes.addBookInfoName}>Hình minh họa:</div>
              <div className = {classes.imageInput}>
                <button className={classes.addBookImageInput}>+</button>
                <button className={classes.addBookImageInput}>+</button>
                <button className={classes.addBookImageInput}>+</button>
              </div>
            </div>
            <div style={{ float: 'right' }}>
              <button className={classes.addBookBtn}>THÊM SÁCH</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
