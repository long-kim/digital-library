import { auth } from 'firebase-admin';
import * as firebase from 'firebase/app';
import { firebaseConfig } from '../../firebase/config';
import 'firebase/firestore';
import 'firebase/storage';
import { NextApiRequest, NextApiResponse } from 'next';
// import formidable from 'formidable';

import Busboy from 'busboy';

const addBook = (req: NextApiRequest, res: NextApiResponse) => {
    // if (!req.body) {
    //     res.status(400).json({ status: false, message: 'Bad Request' });
    //     return;
    // }

    // new formidable.IncomingForm().parse(req, async (err, fields, files) => {
    //     if (err) {
    //         console.error(err);
    //     }

    //     console.log(fields);
    //     console.log(files);

    //     // Initialize DB and Storage
    //     if (!firebase.apps.length) {
    //         firebase.initializeApp(firebaseConfig);
    //     }
    
    //     const db = firebase.firestore();
    //     const storageRef = firebase.storage().ref();
    
    //     // Get books collection ref
    //     const bookRef = db.collection('books-test').doc();
    
    //     // Generate a random ID
    //     const id = bookRef.id;
    
    //     // Image processing
    //     // for (let key in files) {
    //     //     const image = files[key];

    //     //     const extension = image.name.substring(image.name.lastIndexOf('.') + 1);

    //     //     // bookId/0.ext
    //     //     const pathRef = storageRef.child(`${id}`);
    //     //     const imageRef = pathRef.child(`${key}.${extension}`);
    //     //     console.log(files[key]);
    //     //     let uploadTask = imageRef.put(image as File);
    
    //     //     console.log(`Uploaded ${id}/${key}.${extension}`);
    //     // }
    
    //     let img: string[] = [];
    //     for (let key in files) {
    //         const image = files[key];
    //         const extension = image.name.substring(image.name.lastIndexOf('.') + 1);
    //         img.concat(`${id}/${key}.${extension}`);
    //         console.log(img);
    //     }
    
    //     let data = {
    //         author: fields['author'],
    //         name: fields['name'],
    //         overview: fields['overview'],
    //         cate: JSON.parse(fields['cate'] as string),
    //         img: img,
    //         status: 'pending',
    //         user: fields['user']
    //     }
    //     console.log(data);
    //     // Add to new document to books collections
    //     let newDoc = await db.collection('books-test').doc(id).set(data);
    
    //     res.json({
    //         id: id,
    //         data: data
    //     });
    // });

    // const busboy = new Busboy({headers: req.headers});

    // let formData = {};
    // busboy.on('field', (fieldname, val) => {
    //     console.log("REACH");
    //     formData.fieldname = val;
    // });

    // busboy.on('finish',() => {
    //     res.send(formData);
    // })

    // busboy.end(req.body);
    
};

export const config = {
    api: {
        bodyParser: false
    },
};

export default addBook;
