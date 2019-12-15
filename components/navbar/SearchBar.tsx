import { fade, InputBase, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: '50rem',
      border: 'solid 1px #e2e2e2',
      marginRight: theme.spacing(2),
      backgroundColor: fade(theme.palette.common.white, 0.05),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.15),
      },
    },
    inputRoot: {
      color: '#fff',
    },
    inputInput: {
      padding: theme.spacing(1, 2),
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: 200,
        '&:focus': {
          width: 260,
        },
      },
    },
  }),
);

const SearchBar: React.FC = () => {
  // function _onSubmit(){
  //   window.location("/search");
  // }

  const classes = useStyles();

  return (
    <div className={classes.search}>
      <form action="/search">
        <InputBase
          // onSubmit={_onSubmit}
          placeholder="Tìm kiếm..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
