import { Container, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Error from 'next/error';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Book } from '../../components/users/BookItem';
import ProfileInfo from '../../components/users/ProfileInfo';
import { firebaseConfig } from '../../firebase/config';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

const MyFriends = dynamic(() => import('../../components/users/MyFriends'));
const MyBooks = dynamic(() => import('../../components/users/MyBooks'));
const BorrowedBooks = dynamic(() =>
  import('../../components/users/BorrowedBooks'),
);
const Discovery = dynamic(() => import('../../components/users/Discovery'));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#726969',
    },
    container: {
      padding: '3.5rem 0',
    },
    userInfoWrapper: {
      padding: '4rem 0',
    },
    tabPanel: {
      height: '100%',
    },
  }),
);

interface ITabPanelProps {
  index: number;
  value: number;
}

const TabPanel: React.FC<ITabPanelProps> = ({ index, value, children }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {value === index && (
        <Grid container className={classes.tabPanel}>
          {children}
        </Grid>
      )}
    </React.Fragment>
  );
};

interface IProfileProps {
  profile?: any;
  uid?: string;
  error?: any;
}

const Profile: NextPage<IProfileProps> = ({ profile, uid, error }) => {
  const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);
  const [tab, setTab] = useState(0);

  let db: firebase.firestore.Firestore;

  const [
    profileData,
    setProfileData,
  ] = useState<firebase.firestore.DocumentData | null>(null);

  const [friends, setFriends] = useState<
    Array<firebase.firestore.DocumentData | undefined>
  >();
  const [books, setBooks] = useState<Array<Book | undefined>>();
  const [borrowed, setBorrowed] = useState<Array<Book | undefined>>([]);

  const [weeklyBooks, setWeeklyBooks] = useState<Book[] | null>(null);
  const [recommended, setRecommended] = useState<Book[] | null>(null);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();

    db.collection('books')
      .limit(3)
      .orderBy('rating', 'desc')
      .get()
      .then(snapshot =>
        snapshot.docs.map(book => ({ id: book.id, data: book.data() })),
      )
      .then(newWeeklyBooks => setWeeklyBooks(newWeeklyBooks))
      .catch(e => console.error(e));

    db.collection('books')
      .limit(3)
      .where('cate', 'array-contains', 'Tiểu thuyết')
      .orderBy('rating', 'desc')
      .get()
      .then(snapshot =>
        snapshot.docs.map(book => ({ id: book.id, data: book.data() })),
      )
      .then(newRecommended => setRecommended(newRecommended))
      .catch(e => console.error(e));
  }, []);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();

    db.collection('users')
      .where('uid', '==', uid as string)
      .get()
      .then(userSnapshot => userSnapshot.docs?.[0])
      .then(firebaseProfile => setProfileData(firebaseProfile.data()))
      .catch(e => {
        console.error(e);
      });
  }, [uid]);

  useEffect(() => {
    const friendRefs: firebase.firestore.DocumentReference[] =
      profileData?.friends ?? [];
    const bookRefs: firebase.firestore.DocumentReference[] =
      profileData?.books ?? [];
    const borrowedRefs: firebase.firestore.DocumentReference[] =
      profileData?.borrowed ?? [];

    Promise.all([
      ...friendRefs.map(async friendRef => {
        try {
          const friendDocSnapshot = await friendRef.get();
          return friendDocSnapshot.data();
        } catch (error) {
          return undefined;
        }
      }),
    ]).then(newFriends => setFriends(newFriends));

    Promise.all([
      ...bookRefs.map(async bookRef => {
        try {
          const bookDocSnapShot = await bookRef.get();
          return { id: bookRef.id, data: bookDocSnapShot.data() };
        } catch (error) {
          return undefined;
        }
      }),
    ]).then(newBooks => setBooks(newBooks));

    Promise.all([
      ...borrowedRefs.map(borrowedRef =>
        borrowedRef
          .get()
          .then(snapshot => ({ id: borrowedRef.id, data: snapshot.data() }))
          .catch(() => undefined),
      ),
    ]).then(newBorrowed => setBorrowed(newBorrowed));
  }, [profileData]);

  return (
    <React.Fragment>
      {error ? (
        <Error statusCode={500} />
      ) : (
        <React.Fragment>
          <Head>
            <title>{`Profile | ${process.env.APP_NAME}`}</title>
          </Head>
          <Navbar user={user} handleLogout={handleLogout} />
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <ProfileInfo
                  tab={tab}
                  setTab={setTab}
                  profile={profile}
                  own={user?.uid === uid}
                  of={profileData?.fullName}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TabPanel value={tab} index={0}>
                  <MyFriends friends={friends} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                  <Discovery weekly={weeklyBooks} recommended={recommended} />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                  <MyBooks
                    books={books}
                    own={user?.uid === uid}
                    of={profileData?.fullName}
                  />
                </TabPanel>
                <TabPanel value={tab} index={3}>
                  <BorrowedBooks books={borrowed} />
                </TabPanel>
              </Grid>
            </Grid>
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

Profile.getInitialProps = async ({ query }) => {
  const { uid } = query;

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();
  try {
    const userSnapshot = await db
      .collection('users')
      .where('uid', '==', uid as string)
      .get();

    const [profile] = userSnapshot.docs;

    const profileData = profile.data();

    return {
      uid: uid as string,
      profile: {
        ...profileData,
        reviews: profileData.reviews?.length || 0,
        books: profileData.books?.length || 0,
        friends: profileData.friends?.length || 0,
        borrowed: (profileData.borrowed ?? []).length,
      },
    };
  } catch (error) {
    return { error };
  }
};

export default Profile;
