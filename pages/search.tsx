import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Book from '../components/search/book';
import { firebaseConfig } from '../firebase/config';
import { NextPage } from 'next';
import { IBook } from '../components/books/interfaces';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import useFirebaseSearch from '../hooks/useFirebaseSearch';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchTitle: {
      margin: '0px 20px 30px 73px',
      fontSize: '24px',
     
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
    big_body: {
      width: '90%',
      minHeight: '100vh',
      margin: '20px auto',
    },
    body: {
      margin: '1.5rem auto 0',
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',

      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      [theme.breakpoints.up('lg')]: {
        width: '1120px',
      },
      [theme.breakpoints.up('xl')]: {
        width: '1400px',
      },
    },
  }),
);

interface IProps {
  keySearch?: string;
}

const Search: NextPage<IProps> = ({ keySearch }) => {
  const classes = useStyles();
  const [response, handleSearch] = useFirebaseSearch(firebaseConfig);
  // const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const handleClick = (param: any) => () => {
    if (param === 'forward') {
      if (currentPage < Math.ceil(response.length / perPage)) {
        setCurrentPage(currentPage + 1);
      }
    }

    if (param === 'back') {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };
  useEffect(() => {
    handleSearch(keySearch as string);
  }, [keySearch]);
  const [user, _, handleLogout] = useFirebaseAuth(firebaseConfig);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  let currentList: IBook[];
  currentList = [];
  if (response) {
    currentList = response.slice(indexOfFirst, indexOfLast);
  }
  const renderProduct = currentList.map((product: IBook, index: number) => {
    console.log("product: ",product);
    let url;
    url = '/books/' + product.id;
    const img = product.data.img
      ? product.data.img[0]
      : 'https://photo-3-baomoi.zadn.vn/w1000_r1/2019_06_26_541_31230527/bef0744e090ee050b91f.jpg';
    return <Book key={index} name={product.data.name} img={img} url={url} />;
  });
  return (
    <div>
      <Navbar page={'/'} user={user} handleLogout={handleLogout} />
      <div className={classes.big_body}>
          <h1 className={classes.searchTitle}>
          Kết quả tìm kiếm:  {keySearch}
          </h1>
        <div className={classes.body}>{renderProduct}</div>
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
            {response.length !== 0 ? currentPage : 0}/
            {Math.ceil(response.length / perPage)}
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
    </div>
  );
};

Search.getInitialProps = ({ query }) => {
  const keySearch: string | undefined = query.keySearch
    ? (query.keySearch as string)
    : '';
  return { keySearch };
};
export default Search;
