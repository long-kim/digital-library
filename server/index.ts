import express from 'express';
import dotenv from 'dotenv';
import auth from './routes/api/auth';

// Loads environment variables
dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;

const server = express();

server.use(auth);

server.listen(port, (error) => {
    if (error) {
        throw error;
    }
});
