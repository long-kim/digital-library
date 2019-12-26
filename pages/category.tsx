import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import { firebaseConfig } from '../firebase/config';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import Category from '../components/category/category';

interface IHomeProps {
  pathname?: string;
}

const CategoryPage: NextPage<IHomeProps> = ({ pathname }) => {
  const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);

  return (
    <React.Fragment>
      <Head>
        <title>Trang chủ | Digital Library</title>
      </Head>
      <Navbar page={pathname} user={user} handleLogout={handleLogout} />
      <Category></Category>
    </React.Fragment>
  );
};

export default CategoryPage;
