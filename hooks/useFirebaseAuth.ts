import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import Logger from 'js-logger';
import React, { useEffect, useState } from 'react';

const useFirebaseAuth: (
  credentials: object,
) => [
  firebase.User | undefined,
  () => Promise<firebase.auth.UserCredential>,
  () => Promise<void>,
] = (credentials: object) => {
  const [user, setUser] = useState<firebase.User>();

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(credentials);
    }

    firebase.auth().onAuthStateChanged(async fbUser => {
      if (fbUser) {
        setUser(fbUser);
        const token = await fbUser.getIdToken();
        const response = await axios.post('/api/login', { token });
      } else {
        setUser(undefined);
        try {
          const response = await axios.post('/api/logout');
        } catch (e) {
          Logger.error(e);
        }
      }
    });
  }, []);

  const handleLogin = () =>
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

  const handleLogout = () => firebase.auth().signOut();

  return [user, handleLogin, handleLogout];
};

export default useFirebaseAuth;
