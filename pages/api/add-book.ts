import { auth } from 'firebase-admin';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const addBook = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body) {
        res.status(400).json({ status: false, message: 'Bad Request' });
    }

    const data = req.body;
    const blob = await fetch(data.img[0]).then(r => r.blob());

    console.log(blob);

    let storageRef = firebase.storage().ref();
    // firebase.firestore().collection('books').
    res.json(req.body);
    // res.json({ message: 'add' });
};

export default addBook;
