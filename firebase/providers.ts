import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
};
