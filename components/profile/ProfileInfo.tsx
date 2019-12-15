import { Avatar, Box, Divider, Link, Typography } from '@material-ui/core';
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SearchIcon from '@material-ui/icons/Search';
import { createStyles, makeStyles } from '@material-ui/styles';
import { NextPage } from 'next';
import React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      color: '#726969',
    },
    container: {
      padding: '3rem 0',
    },
    avatar: {
      width: '6.5rem',
      height: '6.5rem',
    },
    user_name: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#726969',
      lineHeight: '17px',
      marginTop: '0.5rem',
    },
    user_point: {
      fontSize: '0.875rem',
      color: '#726969',
    },
    userInfoWrapper: {
      padding: '4rem 0',
    },
    figureContainer: {
      width: '100%',
    },
    figure: {
      fontWeight: 'bold',
      lineHeight: 1.19,
      color: '#726969',
      fontSize: '1.3rem',
    },
    type: {
      fontSize: '0.7rem',
      lineHeight: 1.18,
      color: '#726969',
    },
    divider: {
      height: '1px',
      width: '90%',
      margin: '1.8rem 0',
    },
    menuItem: {
      margin: '0.9rem 0',
    },
    menuItemText: {
      color: '#726969',
      fontSize: '0.9rem',
      fontWeight: 500,
      lineHeight: 1.2,
      opacity: 0.74,
    },
    menuItemActive: {
      color: '#000000',
      fontWeight: 900,
      fontSize: '0.9rem',
      lineHeight: 1.2,
    },
    menuContainer: {
      alignSelf: 'flex-start',
      marginLeft: '1.5rem',
    },
    icon: {
      color: '#726969',
      marginRight: '1.4rem',
    },
    link: {
      '&:hover': {
        textDecoration: 'none',
      },
    },
  }),
);

interface propsTypes {
  userInfo: any;
  menuIndex: number;
  switchContent: any;
}

interface book {
  status: string;
}
const ProfileInfo: NextPage<propsTypes> = props => {
  function _onClick(index: number){
    return (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      switchContent(index);
    };
  }
  const classes = useStyles();
  const { menuIndex, switchContent, userInfo } = props;

  const userBookFigure = [
    {
      name: 'Cho mượn',
      figure: userInfo.own_books.filter(
        (book: book) => book.status === 'lending',
      ).length,
    },
    {
      name: 'Đã mượn',
      figure: userInfo.borrow_books.length,
    },
    {
      name: 'Review',
      figure: userInfo.review,
    },
  ];

  const userMenu = [
    {
      icon: <PeopleAltIcon className={classes.icon} />,
      name: 'Bạn bè',
    },
    {
      icon: <SearchIcon className={classes.icon} />,
      name: 'Khám phá',
    },
    {
      icon: <MenuBookRoundedIcon className={classes.icon} />,
      name: 'Sách của Thinh',
    },
    {
      icon: <LocalLibraryRoundedIcon className={classes.icon} />,
      name: 'Sách đã mượn',
    },
  ];
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{ marginTop: '4rem' }}
    >
      <Avatar src={userInfo.avatar_url} className={classes.avatar} />
      <Typography className={classes.user_name}>
        {userInfo.full_name}
      </Typography>
      <Typography className={classes.user_point}>
        {userInfo.user_points}
      </Typography>
      <Divider className={classes.divider} />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        className={classes.figureContainer}
      >
        {userBookFigure.map((figure, index) => {
          return (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography className={classes.figure}>
                {figure.figure}
              </Typography>
              <Typography className={classes.type}>{figure.name}</Typography>
            </Box>
          );
        })}
      </Box>
      <Divider className={classes.divider} />
      <Box className={classes.menuContainer}>
        {userMenu.map((item, index) => (
          <Link
            key={index}
            href="#"
            onClick={_onClick(index)}
            className={classes.link}
          >
            <Box
              display="flex"
              flexDirection="row"
              className={classes.menuItem}
              alignItems="center"
            >
              {item.icon}
              {index === menuIndex ? (
                <Typography className={classes.menuItemActive}>
                  {item.name}
                </Typography>
              ) : (
                <Typography className={classes.menuItemText}>
                  {item.name}
                </Typography>
              )}
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default ProfileInfo;
