import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import { firebaseConfig } from '../firebase/config';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import CateItemList from '../components/category/cateItemList'; 

interface IHomeProps {
  pathname?: string;
  query?: any;
}

const CategoryPage: NextPage<IHomeProps> = ({ pathname, query }) => {
  const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);

  console.log(query)
  return (
    <React.Fragment>
      <Head>
        <title>Trang chủ | Digital Library</title>
      </Head>
      <Navbar page={pathname} user={user} handleLogout={handleLogout} />
      <CateItemList cateName={query}></CateItemList>
    </React.Fragment>
  );
};

CategoryPage.getInitialProps = async ({query}) => {
  return {query};
};

export default CategoryPage;
