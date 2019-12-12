import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IBorrow from './IBorrow';
import { Box, Typography, Button } from '@material-ui/core';

const MAIN_COLOR = '#494848';
const BTN_COLOR = '#8d8585';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            color: MAIN_COLOR,
            alignItems: 'center',

            margin: '20px',

        },
        btn: {
            backgroundColor: BTN_COLOR,
            color: '#fff',
            fontSize: '16px',
            padding: '4px 18px',
            textTransform: 'none'
        }
    })
)

const BorrowOption: React.FC<IBorrow> = ({fullname, uid, bid}) => {
    const classes = useStyles();

    const handleClick = () => {
        // TODO
    }

    return (
        <React.Fragment>
            <Box className={classes.container}>
                <Typography>{fullname}</Typography>
                <Button variant='contained' className={classes.btn} onClick={handleClick}>Hỏi mượn</Button>
            </Box>
        </React.Fragment>
    );

}

export default BorrowOption;