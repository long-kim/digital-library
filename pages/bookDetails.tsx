import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import BookDetails from '../components/bookDetails/bookDetails';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import { firebaseConfig } from '../firebase/config';
import useFirebaseAuth from './hooks/useFirebaseAuth';

interface IHomeProps {
  pathname?: string;
}

const BookDetailsPage: NextPage<IHomeProps> = ({ pathname }) => {
  const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);

  return (
    <React.Fragment>
      <Head>
        <title>Trang chủ | Digital Library</title>
      </Head>
      <Navbar page={pathname} user={user} handleLogout={handleLogout} />
      <BookDetails />
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default BookDetailsPage;
