import firebase from 'firebase/app';
import 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseConfig } from '../../../../firebase/config';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();

  const {
    query: { bookId },
    body: { uid, rating, content },
  } = req;

  if (!uid) {
    res.status(403).end();
  }

  let review: firebase.firestore.DocumentReference;

  db.collection('users')
    .where('uid', '==', uid)
    .get()
    .then(userSnapshot => userSnapshot.docs?.[0])
    .then(user => {
      review = db.collection('reviews').doc();

      return review.set({
        book: bookId,
        user: db.doc(`users/${user.id}`),
        content,
        rating: parseFloat(rating),
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      });
    })
    .then(() => db.doc(`books/${bookId}`).get())
    .then(doc => doc.get('reviews'))
    .then(reviews => reviews.push(review))
    .then(() => res.status(200).end())
    .catch(error => res.status(500).send({ error }));
};
