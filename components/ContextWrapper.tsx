import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { firebaseConfig } from '../firebase/config';

interface AppState {
  user: firebase.User | null;
}

const ContextWrapper: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    // Sets up Firebase Auth
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    return firebase.auth().onAuthStateChanged(fbUser => {
      if (fbUser) {
        setUser(fbUser);
      }
    });
  }, []);

  const context: AppState = {
    user,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default ContextWrapper;
