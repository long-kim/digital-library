import {
Theme,
Box,
Typography,
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
        margin: "1rem 0",
        fontWeight: "bold",
        color: "#111111"
    },
}),
);

const Explore = () => {
    const classes = useStyles();
    var mock_data = [
        {
            image_url: "/img/book1.jpg",
            name: "Percy Jackson"
        },
        {
            image_url: "/img/book2.jpg",
            name: "Percy Jackson"
        },
        {
            image_url: "https://images-na.ssl-images-amazon.com/images/I/91-PEqHPZbL._SY445_.jpg",
            name: "Percy Jackson"
        },
        {
            image_url: "https://images-na.ssl-images-amazon.com/images/I/91-PEqHPZbL._SY445_.jpg",
            name: "Percy Jackson"
        },
        {
            image_url: "https://images-na.ssl-images-amazon.com/images/I/91-PEqHPZbL._SY445_.jpg",
            name: "Percy Jackson"
        }
    ]
    return(
        <Box>
            <Typography className = {classes.title} variant = "h5">Sách hay trong tuần:</Typography>
            <Slick data = {mock_data} Item = {Book}/>
            <Typography className = {classes.title} variant = "h5">Gợi ý:</Typography>
            <Slick data = {mock_data} Item = {Book}/>
        </Box>
    )
} 

    export default Explore;