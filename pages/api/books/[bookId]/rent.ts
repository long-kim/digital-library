import firebase from 'firebase/app';
import 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { concat, from, of, throwError } from 'rxjs';
import { catchError, flatMap, tap } from 'rxjs/operators';
import { firebaseConfig } from '../../../../firebase/config';

export enum RentStatus {
  Unconfirmed,
  Pending,
  Ongoing,
  Overdue,
  Complete,
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();

  const {
    body: { uid, lenders },
    query: { bookId },
  } = req;

  if (!uid) {
    res.status(403).end();
  }

  const rentRefs: string[] = [];

  // Get a new write batch
  const batch = db.batch();

  // Add a rent item for each lender
  concat(
    ...(lenders as string).split(',').map(lender =>
      of(db.collection('rents').doc()).pipe(
        tap(rentRef => rentRefs.push(rentRef.id)),
        flatMap(rentRef =>
          from(
            rentRef.set({
              bookId,
              borrowAt: firebase.firestore.Timestamp.fromDate(new Date()),
              duration: 5,
              from: lender,
              to: uid,
              status: RentStatus.Unconfirmed,
            }),
          ),
        ),
        catchError(err => throwError(err)),
      ),
    ),
  )
    .pipe(
      flatMap(() => from(batch.commit())),
      catchError(err => throwError(err)),
    )
    .subscribe(
      () => res.status(200).end(),
      err => res.status(500).json({ err }),
    );
};
