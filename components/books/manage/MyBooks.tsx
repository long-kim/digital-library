import {
  Box,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import React, { useMemo } from 'react';
import { getDueDate } from '../../../pages/books/manage';
import { StyledTableCell } from '../../../pages/checkout';

moment.locale('vi');

const BookRow: React.FC<{
  book: any;
  data: any;
  borrower: any;
  idx: number;
}> = ({ book, data, borrower, idx }) => {
  const dueDate = useMemo(
    () => moment(getDueDate(data.borrowAt, data.duration)).format('DD/MM/YYYY'),
    [data],
  );

  return (
    <TableRow>
      <TableCell>{idx + 1}</TableCell>
      <TableCell>{book.name}</TableCell>
      <TableCell align="center">{book.author}</TableCell>
      <TableCell align="center">{data.status}</TableCell>
      <TableCell align="center">{borrower.fullName}</TableCell>
      <TableCell align="right">{dueDate}</TableCell>
    </TableRow>
  );
};

const MyBooks: React.FC<{ books: any[] | null }> = ({ books }) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Box my={4}>
          <Typography variant="h5">Bảng thông tin mượn sách</Typography>
        </Box>
      </Grid>
      <Grid item>
        {books ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>STT</StyledTableCell>
                  <StyledTableCell>Tên sách</StyledTableCell>
                  <StyledTableCell align="center">Tác giả</StyledTableCell>
                  <StyledTableCell align="center">Trạng thái</StyledTableCell>
                  <StyledTableCell align="center">Mượn của</StyledTableCell>
                  <StyledTableCell align="right">Thời hạn trả</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.length ? (
                  books.map(({ data, book, user: borrower }, idx) => (
                    <BookRow
                      key={idx}
                      idx={idx}
                      data={data}
                      book={book}
                      borrower={borrower}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Bạn chưa có cuốn sách nào trong giỏ hàng.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default MyBooks;
