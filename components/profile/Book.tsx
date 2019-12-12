import {
Avatar,
Grid,
Container,
Paper,
TextField,
Theme,
Divider,
Box,
Typography,
Icon
} from '@material-ui/core';

import { createStyles, makeStyles, mergeClasses } from '@material-ui/styles';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Slick from "./Slick";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    cardImage: {
        width: "100%",
        height: "100%",
    },
    bookContainer: {
        width: "11.75rem",
        height: '18.75rem',
        backgroundColor: "#000"
    },
    cardName: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.24,
        color: "#3b3b3b",
        marginTop: "0.625rem"
    }
}),
);

type bookProps = {
    image_url: string,
    name: string
}

const Book = (props: bookProps) => {
    const classes = useStyles();
    const {image_url, name} = props;
    return (
        <Box 
            display = "inline-block"
            className = {classes.bookContainer}
        >
            <Avatar src = {image_url} variant = "square" className = {classes.cardImage }/>
            <Typography className = {classes.cardName}>
                {name}
            </Typography>
        </Box>
    )
}

export default Book;