import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { credential, initializeApp } from 'firebase-admin';
import next from 'next';
import dotenv from 'dotenv';

// Loads environment variables
dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;
const fileStore = require('session-file-store')(session);

// Initializes Next application
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

// Initializes Firebase
const { firebaseServerCredentials } = require('../../credentials/server');
const firebase = initializeApp({
        credential: credential.cert(firebaseServerCredentials),
    },
    'server'
);

// Starts Express server
const server = express();

// Configure Express application
server.use(bodyParser());
server.use(session({
    secret: process.env.APP_KEY,
    saveUninitialized: true,
    store: new fileStore(),
    resave: false,
    cookie: {
        maxAge: 60 * 60 * 24 * 7
    },
}));

export default server;
