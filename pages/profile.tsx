import {
Grid,
Container,
Theme,
} from '@material-ui/core';

import { createStyles, makeStyles, mergeClasses } from '@material-ui/styles';
import { NextPage } from 'next';
import Head from 'next/head';
import React, {useState, useEffect} from 'react';
import Navbar from '../components/navbar/Navbar';
import { firebaseConfig } from '../firebase/config';
import useFirebaseAuth from './hooks/useFirebaseAuth';

import MyBooks from "../components/profile/MyBooks";
import Explore from "../components/profile/Explore";
import MyFriends from "../components/profile/MyFriends";
import ProfileInfo from "../components/profile/ProfileInfo";
import Borrow from "../components/profile/Borrow";

import mock_data from "../Mock-data/user-data";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: "#726969"
        },
        container: {
            padding: "3.5rem 0"
        },
        userInfoWrapper: {
            padding: "4rem 0"
        },
    }),
);


const Profile: NextPage = () => {
const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);
const [menuIndex, setMenuIndex] = useState(0);
const classes = useStyles();

// useEffect( getContent, [menuIndex])

//TODO function to get user data here 

const user_data = mock_data;
console.log("user_ data" ,user_data);
function getContent(){
    switch(menuIndex){
        case 0 :
            return <MyFriends friends = {user_data.friends}/>
        case 1 :
            return <Explore />
        case 2 :
            return <MyBooks books = {user_data.own_books}/>
        case 3 :
            return <Borrow books = {user_data.borrow_books}/>
    }
}
return (
    <React.Fragment>
    <Head>
        <title>{`Đăng nhập | ${process.env.APP_NAME}`}</title>
    </Head>
    <Navbar user={user} handleLogout={handleLogout} />
    <Container className = {classes.container}>
        <Grid container spacing={10}>
            <Grid item xs={4} className = {classes.userInfoWrapper}>
                <ProfileInfo 
                    userInfo = {user_data}
                    menuIndex = {menuIndex} 
                    switchContent = {setMenuIndex}
                />
            </Grid>
            <Grid item xs={8} >
                {
                    getContent()
                }
            </Grid>
        </Grid>
    </Container>
    </React.Fragment>
);
};

export default Profile;
