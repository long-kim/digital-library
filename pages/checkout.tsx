import React from 'react';
import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import { firebaseConfig } from '../firebase/config';
import Navbar from '../components/navbar/Navbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core';
import Book from '../components/search/book';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      color: '#726969',
      fontWeight: 'bold',
      border: 'solid 1px #726969',
    },
    body: {
      color: '#726969',
      fontSize: 14,
      border: 'solid 1px #726969',
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // width: '100%',
      overflowX: 'auto',
      margin: '0 73px 47px 73px',
      color: '#726969;',
    },
    table: {
      minWidth: 650,
    },
    checkoutTitle: {
      color: '#726969',
      fontSize: '36px',
      margin: '71px 0 31px 73px',
    },
    cart2Btn: {
      textAlign: 'end',
    marginRight: '73px'
    },
    cartBtn: {
      width: '202px',
      height: '35px',
      borderRadius: '24px',
      border: 'solid 1px #8d8585',
      backgroundColor: '#8d8585',
      color: '#ffffff',
      fontSize: '14px',
    },
    cartMiss: {
      margin: '55px 0 31px 73px',
      fontSize: '27px',
      fontWeight: 'bold',
      color: '#3b3b3b',
      opacity: '0.8'
    },
    searchDisplayBook: {
      display: 'grid',
      gridTemplateColumns: 'auto auto auto auto auto',
      margin: '0 73px 54px 73px',
    },
  }),
);

let products = [
  { name: 'Percy Jackson book', img: '/img/book1.jpg' },
  { name: 'Percy Jackson book', img: '/img/book2.jpg' },
  { name: 'Percy Jackson book', img: '/img/book3.jpg' },
  { name: 'Percy Jackson book', img: '/img/book4.jpeg' },
  { name: 'Percy Jackson book', img: '/img/book5.jpeg' },
  { name: 'Percy Jackson book', img: '/img/book6.jpg' },
  { name: 'Percy Jackson book', img: '/img/book7.jpg' },
  { name: 'Percy Jackson book', img: '/img/book8.jpg' },
  { name: 'Percy Jackson book', img: '/img/book1.jpg' },
  { name: 'Percy Jackson book', img: '/img/book2.jpg' }
];

type IProps = {};

function createData(
  name: number,
  calories: string,
  fat: string,
  carbs: string,
) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData(1, 'Harry Potter and The Goblet of Fire', 'Thịnh - 808', '5 ngày'),
  createData(2, 'Percy Jackson and The lightning thef', 'An - 301', '2 ngày'),
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  // createData('Eclair', 262, 16.0, 24, 6.0),
  // createData('Cupcake', 305, 3.7, 67, 4.3),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const CheckOut: React.FC<IProps> = () => {
  const classes = useStyles();
  const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);

  const renderProduct = products.map((product: any, i) => {
    let url;
    url = '/display-product/' + product.name;
    return <Book key={i} name={product.name} img={product.img} url={url} />;
  });

  return (
    <div>
      <Navbar page={'/'} user={user} handleLogout={handleLogout} />
      <div className={classes.checkoutTitle}>Giỏ hàng của tôi</div>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell> */}
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center">
                Tên sách&nbsp;(g)
              </StyledTableCell>
              <StyledTableCell align="center">
                Người cho mượn&nbsp;(g)
              </StyledTableCell>
              <StyledTableCell align="center">
                Thời gian cho mượn&nbsp;(g)
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.name}>
                {/* <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell> */}
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.calories}</StyledTableCell>
                <StyledTableCell align="center">{row.fat}</StyledTableCell>
                <StyledTableCell align="center">{row.carbs}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <div className={classes.cart2Btn}>
        <button className={classes.cartBtn}>TIẾP TỤC TÌM SÁCH</button>
        <button className={classes.cartBtn}>ĐĂNG KÝ MƯỢN</button>
      </div>
    <div className={classes.cartMiss}>
      Bạn có thể đã bỏ lỡ...
    </div>
    <div className={classes.searchDisplayBook}>{renderProduct}</div>
    </div>

  );
};

export default CheckOut;
