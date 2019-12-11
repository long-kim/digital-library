import firebase from 'firebase/app';
import 'firebase/auth';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import providers from '../firebase/providers';

const useFirebaseAuth: (
  credentials: object,
) => [
  firebase.User | undefined,
  (
    provider?: firebase.auth.AuthProvider,
  ) => Promise<firebase.auth.UserCredential | void>,
  () => Promise<void>,
] = (credentials: object) => {
  const [user, setUser] = useState<firebase.User>();

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(credentials);
    }

    return firebase.auth().onAuthStateChanged(async fbUser => {
      if (fbUser) {
        setUser(fbUser);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  const handleLogin = async (
    provider: firebase.auth.AuthProvider = providers.googleProvider,
  ) => {
    try {
      return firebase.auth().signInWithPopup(provider);
    } catch (error) {
      if (error.code && _.startsWith(error.code, 'auth')) {
        /* Firebase Auth error */
        if (
          error.email &&
          error.credential &&
          error.code === 'auth/account-exists-with-different-credential'
        ) {
          const signInMethods = await firebase
            .auth()
            .fetchSignInMethodsForEmail(error.email);
          if (_.includes(signInMethods, 'google.com')) {
            const googleProvider = new firebase.auth.GoogleAuthProvider().setCustomParameters(
              { login_hint: error.email },
            );
            const googleCredential = await firebase
              .auth()
              .signInWithPopup(googleProvider);
            if (googleCredential.user) {
              return googleCredential.user.linkWithCredential(error.credential);
            }
          }
        }
      } else {
        throw error;
      }
    }
  };

  const handleLogout = () => firebase.auth().signOut();

  return [user, handleLogin, handleLogout];
};

export default useFirebaseAuth;
