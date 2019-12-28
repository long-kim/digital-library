import React, { Component } from 'react';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBook: {
      width: '188px',
      height: '287px',
      backgroundSize: 'cover',
      objectFit: 'cover',
    },
    searchSubTitle: {
      color: '#3b3b3b',
      fontSize: '17px',
      textDecoration: 'none',
    },
    addToCartBtn: {
      width: '188px',
      height: '51px',
      opacity: '0.79',
      backgroundColor: '#000000',
      color: '#bcb6b6',
      fontSize: '17px',
      fontFamily: 'Lato',
      border: 'none',
      bottom: '46.5px',
      left: '0',
      position: 'absolute',
    },
  }),
);

type IProps = {
  key: number;
  name: string;
  img: string;
  url: string;
}


const Book: React.FC<IProps> = ({ key, url, img, name }) => {
  // const key = Book(props.book)
  const classes = useStyles();
  return (
    <div
      key={key}
      style={{
        // display: 'flex',
        // justifyContent: 'center',
        position: 'relative',
        width: "200px",
        margin: '0 40px',
      }}
    >
      <Link href="/books/[bookId]" as={url} passHref>
        <div style = {{ cursor: "pointer"}} >
        <img src={img} alt={name} className={classes.searchBook} />
        {/* <button className={classes.addToCartBtn}>Thêm vào giỏ</button> */}
        <div>
          <p style={{ marginTop: '0' }}>{name}</p>
        </div>
        </div>
      </Link>
    </div>
  );
};

export default Book;
