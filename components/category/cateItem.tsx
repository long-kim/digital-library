import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React from 'react';
import ICate from './ICate';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        width: "340px",
        height: "260px",
        margin: '10px 30px',
    },
    cateImg: {
        width: '100%',
        height: '180px',
        boxShadow: '4px 10px 10px 0 rgba(0, 0, 0, 0.16)',
        cursor: 'pointer',
    },
    cateName: {
        fontSize: '28px',
        color: '#4a4a4a',
    },
    bookCounts: {
        fontSize: '14px',
        color: '#b9b9b9',
    },

  }),
);

const CateItem: React.FC<ICate> = ({ cateImg, cateName, bookCounts }) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.cateImg} style={{background: `url("${cateImg}") no-repeat center top /cover`}}></div>
            <div className={classes.cateName}>{cateName}</div>
            <div className={classes.bookCounts}>{bookCounts} đầu sách</div>
        </div>
    );
};

export default CateItem;
