import { auth } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

const login = (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body) {
    res.status(400).json({ status: false, message: 'Bad Request' });
  }

  res.json({ message: 'test' });
};

export default login;
