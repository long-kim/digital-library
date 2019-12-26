import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { NextPage } from 'next';
import React, {useState, useEffect} from 'react';
import useFirebaseAuth from '../../pages/hooks/useFirebaseAuth';

import * as firebase from 'firebase/app';
import { firebaseConfig } from '../../firebase/config';
import 'firebase/firestore';
import 'firebase/storage';
import Book from '../search/book';

interface IHomeProps {
    pathname?: string;
    cateName: any;
  }  

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    big_body: {
        width: "90%",
        minHeight: '100vh',
        margin: '0 auto',
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
    }
  }),
);



const CateItemList: NextPage<IHomeProps> = ({ cateName }) => {
    const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);
    const [response, setResponse] = useState<Array<any>>([]);
    const classes = useStyles();
    // console.log(cateName);
    const getCateItemList = () => {
        // Initialize DB and Storage
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        const db = firebase.firestore();
        // const storageRef = firebase.storage().ref();

        let data: Array<any> = [];

        db.collection('books').where('cate', 'array-contains', cateName.cateName).get().then((snapshot) => {
            snapshot.forEach(doc => {
                data.push({
                    data: doc.data(),
                    id: doc.id
                });
            });
            setResponse(data);
        });        
    }

    useEffect( getCateItemList ,[]);
    return (
        <div className={classes.big_body}>
            <h1>Thể loại sách: {cateName.cateName}</h1>
            <div className={classes.body}>
                {
                response.map((book: any, i) => {
                    let url;
                    url = '/books/' + book.id;
                    let img = book.data.img ? book.data.img[0] : "https://marketplace.canva.com/EADajpcXwvU/1/0/501w/canva-rust-orange-lioness-vintage-book-cover-2r7-sbV3ztw.jpg";
                    return <Book key={book.id} name={book.data.name} img={img} url={url}></Book>
                })}
            </div>
        </div>
    );
}



export default CateItemList;
