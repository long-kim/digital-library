import firebase from 'firebase/app';
import 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { forkJoin, from, of, throwError } from 'rxjs';
import { catchError, defaultIfEmpty, flatMap, map, tap } from 'rxjs/operators';
import { firebaseConfig } from '../../../../../firebase/config';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();

  const {
    query: { uid },
  } = req;

  if (!uid) {
    res.status(403).end();
  }

  from(
    db
      .collection('rents')
      .where('to', '==', uid)
      .where('status', '==', 0)
      .get(),
  )
    .pipe(
      map(snapshot => snapshot.docs),
      map(docs => docs.map(doc => doc.data())),
      flatMap(items =>
        forkJoin(
          ...items.map(item =>
            forkJoin({
              data: of(item),
              user: from(
                db
                  .collection('users')
                  .where('uid', '==', item.from)
                  .get(),
              ).pipe(
                map(fromRef => fromRef.docs?.[0]),
                map(lender => lender.data()),
              ),
              book: from(item.bookId.get()).pipe(
                map((book: firebase.firestore.DocumentSnapshot) => book.data()),
              ),
            }),
          ),
        ),
      ),
      defaultIfEmpty([]),
      tap(items => console.log(items)),
      catchError(err => throwError(err)),
    )
    .subscribe(
      items => res.status(200).send(items),
      err => res.status(500).json({ err }),
    );
};
