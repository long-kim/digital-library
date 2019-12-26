import React from 'react';
import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Rating } from '@material-ui/lab';
import IReview from './IReview';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        review: {
            margin: '40px 0',
        },
        info: {
            height: '104px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '23px',
        },
        ava: {
            width: '104px',
            height: '104px',
            borderRadius: '50%',
            marginRight: '16px',
        },
        name_rate: {
            
        },
        name: {
            fontSize: '21px',
            color: '#726969',
        },
        comment: {
            textAlign: 'left',
            color: '#bcb6b6',
            fontSize: '17px',
        },
    }),
)

const Review: React.FC<IReview> = ({ava, name, rate, review}) => {
    const classes = useStyles();

    return (
        <div className={classes.review}>
            <div className={classes.info}>
                <img className={classes.ava} src={ava}></img>
                <div className={classes.name_rate}>
                    <div className={classes.name}>{name}</div>
                    <Rating readOnly value={3} size="large"></Rating>                                
                </div>
            </div>
            <div className={classes.comment}>
                {review}
            </div>
        </div>
    );
};

export default Review;

