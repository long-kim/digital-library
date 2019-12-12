import React, { Component, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Book from '../components/search/book';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles } from '@material-ui/core';
import { firebaseConfig } from '../firebase/config';
import useFirebaseAuth from './hooks/useFirebaseAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchTitle: {
      margin: '50px 20px 30px 73px',
      fontSize: '30px',
      fontStyle: 'italic',
    },
    searchKetqua: {
      color: '#929292',
    },
    searchKeyword: {
      color: '#3b3b3b',
    },
    searchPagination: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '68px',
    },
    searchBook: {
      width: '188px',
      height: '287px',
      backgroundSize: 'cover',
    },
    searchDisplayBook: {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto auto auto',
      margin: '0 73px 0 73px',
    },
    searchSubTitle: {
      color: '#3b3b3b',
      fontSize: '17px',
      textDecoration: 'none',
    },
  }),
);

let products = [
  { name: 'Percy Jackson book', img: '/img/book1.jpg' },
  { name: 'Percy Jackson book', img: '/img/book2.jpg' },
  { name: 'Percy Jackson book', img: '/img/book3.jpg' },
  { name: 'Percy Jackson book', img: '/img/book4.jpeg' },
  { name: 'Percy Jackson book', img: '/img/book5.jpeg' },
  { name: 'Percy Jackson book', img: '/img/book6.jpg' },
  { name: 'Percy Jackson book', img: '/img/book7.jpg' },
  { name: 'Percy Jackson book', img: '/img/book8.jpg' },
  { name: 'Percy Jackson book', img: '/img/book1.jpg' },
  { name: 'Percy Jackson book', img: '/img/book2.jpg' },
  { name: 'Percy Jackson book', img: '/img/book3.jpg' },
];

type IProps = {
  products: Array<Object>;
};

// type IState = {
//   totalPage?: number;
//   currentPage?: number;
//   perPage?: number;
//   allProduct?: Array<Object> | undefined;
// };

const Search: React.FC<IProps> = () => {
  const classes = useStyles();
  // const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const allProduct = products;

  let handleClick = (param: any) => (event: any) => {
    if (param === 'forward') {
      if (currentPage < Math.ceil(products.length / perPage)) {
        setCurrentPage(currentPage + 1);
      }
    }

    if (param === 'back') {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const [user, _, handleLogout] = useFirebaseAuth(firebaseConfig);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  let currentList: Array<Object>;
  currentList = [];
  if (products) {
    currentList = products.slice(indexOfFirst, indexOfLast);
  }
  const renderProduct = currentList.map((product: any, i) => {
    let url;
    url = '/display-product/' + product.name;
    return <Book key={i} name={product.name} img={product.img} url={url} />;
  });
  return (
    <div>
      <Navbar page={'/'} user={user} handleLogout={handleLogout} />
      <div className={classes.searchTitle}>
        <span className={classes.searchKetqua}>Kết quả tìm kiếm: </span>
        <span className={classes.searchKeyword}>Tiểu thuyết</span>
      </div>
      <div className={classes.searchDisplayBook}>{renderProduct}</div>
      <div className={classes.searchPagination}>
        <img
          src="/img/chevron-left-solid.svg"
          style={{
            width: '24px',
            height: '24px',
            cursor: 'pointer',
          }}
          onClick={handleClick('back')}
        />
        <p className="paginate-number">
          {currentPage}/{Math.ceil(products.length / perPage)}
        </p>
        <img
          src="/img/chevron-right-solid.svg"
          style={{
            width: '24px',
            height: '24px',
            cursor: 'pointer',
          }}
          onClick={handleClick('forward')}
        />
      </div>
    </div>
  );
};

export default Search;
