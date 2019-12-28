import { fade, InputBase, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import Router from 'next/router';
import React, {useState} from 'react';


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
  const [search, setSearch] = useState<string>('');
  const classes = useStyles();
  function handleChange(event: any) {
    setSearch(event.target.value);
  }
  function onSubmit(event: any) {
    event.preventDefault();
    if (search.length > 0) {
      Router.push({
        pathname: '/search',
        query: {keySearch: search},
      });
    }
  }
  return (
    <div className={classes.search}>
      <form onSubmit={onSubmit}>
        <InputBase
          onChange={handleChange}
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
