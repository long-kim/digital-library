import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useState } from 'react';
import { throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, tap } from 'rxjs/operators';
import * as Yup from 'yup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    submitButton: {
      padding: theme.spacing(1, 3),
      borderRadius: '50rem',
    },
    onSubmit: {},
  }),
);

interface ICommentFormProps {
  bookId: string | undefined;
  currentUid: string | undefined;
}

const CommentForm: React.FC<ICommentFormProps> = ({ bookId, currentUid }) => {
  const [rating, setRating] = useState(3);
  const [submit, setSubmit] = useState(false);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      rating,
      content: '',
    },
    validationSchema: Yup.object<{ rating: number; content: string }>({
      rating: Yup.number()
        .min(0)
        .max(5),
      content: Yup.string()
        .min(20, 'Nội dung review cần dài hơn 20 kí tự!')
        .required('Nội dung review không được trống!'),
    }),
    onSubmit: values => {
      setSubmit(true);
      ajax({
        url: `/api/books/${bookId}/reviews`,
        method: 'post',
        body: { ...values, uid: currentUid },
      })
        .pipe(
          tap(res => console.log(res)),
          map(res => res.status === 200),
          catchError(e => throwError(e)),
        )
        .subscribe(
          status => status && setSubmit(false),
          e => console.error(e),
        );
    },
  });

  const handleChange = (event: React.ChangeEvent, value: number) => {
    formik.handleChange(event);
    setRating(value);
  };

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Grid item>
        <Typography variant="h5" gutterBottom>
          Để lại bình luận
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          name="content"
          variant="outlined"
          multiline
          rows={7}
          disabled={submit}
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={!_.isUndefined(formik.errors.content)}
          helperText={formik.errors.content}
        />
      </Grid>
      <Grid item container justify="flex-end">
        <Rating
          name="rating"
          precision={0.5}
          value={rating}
          disabled={submit}
          onChange={handleChange}
        />
      </Grid>
      <Grid item container justify="flex-end">
        <Box position="relative">
          <Button
            className={classes.submitButton}
            variant="outlined"
            color="primary"
            type="submit"
            disabled={submit}
          >
            ĐĂNG
          </Button>
          {submit && (
            <Box
              position="absolute"
              top="50%"
              left="50%"
              marginTop="-12px"
              marginLeft="-12px"
            >
              <CircularProgress size={24} />
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CommentForm;
