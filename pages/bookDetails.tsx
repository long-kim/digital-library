import Navbar from '../components/navbar/Navbar';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Footer from '../components/footer/Footer';
import BookDetails from '../components/bookDetails/bookDetails';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import { firebaseConfig } from '../firebase/config';

interface IHomeProps {
    pathname?: string;
}

const Book_Details: NextPage<IHomeProps> = ({pathname}) => {
    const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);

  return (
    <React.Fragment>
      <Head>
        <title>Trang chủ | Digital Library</title>
      </Head>
      <Navbar page={pathname} user={user} handleLogout={handleLogout} />
      <BookDetails></BookDetails>
      <Footer />

    </React.Fragment>
  );
};

export default Book_Details;
