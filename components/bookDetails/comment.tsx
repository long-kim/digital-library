import React from 'react';
import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Rating } from '@material-ui/lab';


const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        cmt: {
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
        },
        cmt_area: {
            width: '100%',
            height: '160px',
            padding: '20px',
            borderRadius: '24px',
            fontSize: '16px',
        },
        comment_btn: {
            width: '170px',
            height: '51px',
            borderRadius: '23px',
            border: 'solid 1px #707070',
            fontSize: '21px',
            backgroundColor: '#fff',
            color: '#939393',
            cursor: 'pointer',
        },
    }),
)

const Comment: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.cmt}>
            <textarea className={classes.cmt_area}></textarea>
            <Rating name="size-large" value={5} size="large" />
            <button className={classes.comment_btn}>ĐĂNG</button>
        </div>
    );
};

export default Comment;

