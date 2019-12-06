import express from 'express';
import session from 'express-session';
import {credential, initializeApp} from 'firebase-admin';
import next from 'next';
import path from 'path';
import dotenv from 'dotenv';

// Loads environment variables
dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;

// Initializes Next application
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

// Initializes Firebase
const { firebaseServerCredentials } = require('../credentials/server');
const firebase = initializeApp({
        credential: credential.cert(firebaseServerCredentials),
    },
    'server'
);

// Starts Express server after initializing Next application
app.prepare().then(() => {
   const server = express();

   // Configure Express application
   server.use(session({
       secret: 'abc',
       saveUninitialized: true,
       resave: false,
   }));

   server.post('/api/login', async (req, res) => {
       if (!req.body) {
           return res.sendStatus(400);
       }

       try {
           const token = req.body.token;
           const decodedToken = await firebase.auth().verifyIdToken(token);
           req.session.token = decodedToken;
           res.json({status: true, decodedToken});
       } catch (error) {
           res.json({status: false, error});
       }
   });

   server.post('/api/logout', (req, res) => {
       req.session.token = null;
       res.json({status: true});
   });

   server.get('*', (req, res) => {
       const handle = app.getRequestHandler();
       return handle(req, res);
   });

   server.listen(port, (error) => {
       if (error) {
           throw error;
       }
   });
});
