import {
Box,
Typography,
Theme
} from '@material-ui/core';

import { createStyles, makeStyles, mergeClasses } from '@material-ui/styles';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import Slick from "./Slick";
import Book from "./Book";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    title: {
        margin: "0 0 1rem",
        fontWeight: "bold",
        color: "#111111"
    },
}),
);

type book = {
    image_url: string,
    name: string,
    id: string,
    status: string,
}

type myBooksProps = {
    books: book[],
}
const MyBooks = (props: myBooksProps) => {
    const classes = useStyles();
    const {books} = props;
    return(
        <Box>
            <Typography className = {classes.title} variant = "h5">Sách của tôi:</Typography>
            <Slick data = {books} Item = {Book}/>
        </Box>
    )
} 

export default MyBooks;