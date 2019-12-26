import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import { NextPage } from 'next';
import Book from '../components/search/book';
import { firebaseConfig } from '../firebase/config';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import useFirebaseSearch from '../hooks/useFirebaseSearch';

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

const products = [
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

interface IProps {
  // products: Array<Object>;
  keySearch?: string|string[];
}

// type IState = {
//   totalPage?: number;
//   currentPage?: number;
//   perPage?: number;
//   allProduct?: Array<Object> | undefined;
// };
const Search: NextPage<IProps> = ({keySearch}) => {
  const classes = useStyles();
  const [response, handleSearch] = useFirebaseSearch(firebaseConfig);
  // const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const allProduct = products;

  const handleClick = (param: any) => (event: any) => {
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
  useEffect( () => {
    handleSearch(keySearch);
  }, []);
  const [user, _, handleLogout] = useFirebaseAuth(firebaseConfig);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  let currentList: Object[];
  currentList = [];
  if (response) {
    currentList = response.slice(indexOfFirst, indexOfLast);
  }
  const renderProduct = currentList.map((product: any, i) => {
    let url;
    url = '/display-product/' + product.name;
    const img = product.img ? product.img[0] : "https://photo-3-baomoi.zadn.vn/w1000_r1/2019_06_26_541_31230527/bef0744e090ee050b91f.jpg";
    return <Book key={product.id} name={product.name} img={img} url={url} />;
  });
  return (
    <div>
      <Navbar page={'/'} user={user} handleLogout={handleLogout} />
      <div className={classes.searchTitle}>
        <span className={classes.searchKetqua}>Kết quả tìm kiếm: </span>
        <span className={classes.searchKeyword}>{keySearch}</span>
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

Search.getInitialProps = ({query}) => {
  const keySearch:string|string[] = query.keySearch ? query.keySearch : '';
  return {keySearch};
};

export default Search;
