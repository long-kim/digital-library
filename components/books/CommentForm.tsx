import { Button, Grid, TextField, Theme, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    submitButton: {
      padding: theme.spacing(1, 3),
      borderRadius: '50rem',
    },
  }),
);

const CommentForm: React.FC = () => {
  const [rating, setRating] = useState(3);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent, value: number) =>
    setRating(value);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5" gutterBottom>
          Để lại bình luận
        </Typography>
      </Grid>
      <Grid item>
        <TextField variant="outlined" multiline rows={7} fullWidth />
      </Grid>
      <Grid item container justify="flex-end">
        <Rating
          name="book-rating"
          precision={0.5}
          value={rating}
          onChange={handleChange}
        />
      </Grid>
      <Grid item container justify="flex-end">
        <Button
          className={classes.submitButton}
          variant="outlined"
          color="primary"
        >
          ĐĂNG
        </Button>
      </Grid>
    </Grid>
  );
};

export default CommentForm;
