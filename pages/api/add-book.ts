import { auth } from 'firebase-admin';
import * as firebase from 'firebase/app';
import { firebaseConfig } from '../../firebase/config';
import 'firebase/firestore';
import 'firebase/storage';
import { NextApiRequest, NextApiResponse } from 'next';

import  fetch  from 'isomorphic-unfetch';

interface IImage {
    type: string,
    url: string,
}

const addBook = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body) {
        res.status(400).json({ status: false, message: 'Bad Request' });
    }

    const body = req.body;

    // Initialize DB and Storage
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.firestore();
    const storageRef = firebase.storage().ref();

    // Get books collection ref
    const bookRef = db.collection('books').doc();

    // Generate a random ID
    const id = bookRef.id;

    // Image processing: Convert ObjectURL to Blob or File
    body.img.forEach((image: IImage, index: number) => {
        fetch(image.url)
        .then(r => r.blob())
        .then(blob => {
            // bookId/0.ext
            const pathRef = storageRef.child(`${id}`);
            const imageRef = pathRef.child(`${index}.${image.type}`);
    
            console.log(`${index}`);
            let uploadTask = imageRef.put(blob);
    
            console.log(`Uploaded ${id}/${index}.${image.type}`);
        }).catch(error => {
            console.error(error);
        })

    });

    const img = body.img.map((image: IImage, index: number) => {
        return `${id}/${index}.${image.type}`;
    });

    let data = {
        author: body.author,
        name: body.name,
        overview: body.overview,
        cate: body.cate,
        img: img,
        status: 'pending',
        owner: body.user
    }

    // Add to new document to books collections
    let newDoc = await db.collection('books').doc(id).set(data);

    res.json({
        id: id,
        data: data
    });
};

export default addBook;
