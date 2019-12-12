import { NextPage } from 'next';
import React from 'react';
import BorrowModal from '../components/modal/BorrowModal';

const list = [
  {
    fullname: 'Jim Tran',
    uid: 'abcxyz',
    bid: '12345',
  },
  {
    fullname: 'Jim Tran',
    uid: 'abcxyz',
    bid: '12345',
  },
  {
    fullname: 'Jim Tran',
    uid: 'abcxyz',
    bid: '12345',
  },
  {
    fullname: 'Jim Tran',
    uid: 'abcxyz',
    bid: '12345',
  },
  {
    fullname: 'Jim Tran',
    uid: 'abcxyz',
    bid: '12345',
  },
  {
    fullname: 'Jim Tran',
    uid: 'abcxyz',
    bid: '12345',
  },
];

// Styling button by passing CSS Properties
const buttonStyle = {
  color: 'red',
};

const TestModal: NextPage = () => {
  return (
    <React.Fragment>
      <BorrowModal list={list} styles={buttonStyle} />
    </React.Fragment>
  );
};

export default TestModal;
