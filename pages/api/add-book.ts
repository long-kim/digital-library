import { auth } from 'firebase-admin';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const addBook = (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body) {
        res.status(400).json({ status: false, message: 'Bad Request' });
    }

    // firebase.firestore().collection('books').

    res.json({ message: 'add' });
};

export default addBook;
