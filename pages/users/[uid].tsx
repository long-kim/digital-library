import { Container, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import MyFriends from '../../components/users/MyFriends';
import ProfileInfo from '../../components/users/ProfileInfo';
import { firebaseConfig } from '../../firebase/config';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

let profileData: firebase.firestore.DocumentData;

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
    <Grid container className={classes.tabPanel}>
      {value === index && children}
    </Grid>
  );
};

interface IProfileProps {
  profile: any;
  uid: string;
}

const Profile: NextPage<IProfileProps> = ({ profile, uid }) => {
  const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);
  const [tab, setTab] = useState(0);
  const [
    profileObj,
    setProfileObj,
  ] = useState<firebase.firestore.DocumentData | null>(null);
  const [friends, setFriends] = useState<
    Array<firebase.firestore.DocumentData | undefined>
  >();
  const classes = useStyles();

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      const db = firebase.firestore();
      const userSnapshot = await db
        .collection('users')
        .where('uid', '==', uid as string)
        .get();

      const [fbProfile] = userSnapshot.docs;

      setProfileObj(fbProfile.data());
    };
    getProfile();
  }, [uid]);

  useEffect(() => {
    const friendRefs: firebase.firestore.DocumentReference[] =
      profileData?.friends || [];

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
  }, [profileObj]);

  return (
    <React.Fragment>
      <Navbar user={user} handleLogout={handleLogout} />
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <ProfileInfo tab={tab} setTab={setTab} profile={profile} />
          </Grid>
          <Grid item xs={12} md={8}>
            <TabPanel value={tab} index={0}>
              <MyFriends profileData={profileObj} friends={friends} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              abc2
            </TabPanel>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

Profile.getInitialProps = async ({ query }) => {
  const { uid } = query;

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();
  const userSnapshot = await db
    .collection('users')
    .where('uid', '==', uid as string)
    .get();

  const [profile] = userSnapshot.docs;

  profileData = profile.data();

  return {
    uid: uid as string,
    profile: {
      ...profileData,
      reviews: profileData.reviews?.length || 0,
      books: profileData.books?.length || 0,
      friends: profileData.friends?.length || 0,
    },
  };
};

export default Profile;
