import {
  Avatar,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      color: '#726969',
    },
    profile: {
      padding: '3rem 0',
    },
    avatar: {
      width: '6.5rem',
      height: '6.5rem',
      boxShadow: theme.shadows[2],
    },
    divider: {
      height: '1px',
      width: '90%',
      margin: '1.8rem 0',
    },
    profileStat: {
      fontWeight: 'bold',
      fontSize: '1.3rem',
    },
    tabRoot: {
      width: '100%',
    },
    tab: {
      maxWidth: 'unset',
      minHeight: 48,
    },
    tabIndicator: {
      width: 3,
      left: 0,
      right: 'unset',
    },
    tabSelected: {
      fontWeight: 'bold',
    },
    tabWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingLeft: theme.spacing(1.5),
      '& svg': {
        marginRight: '1.4rem',
        marginBottom: '0 !important',
      },
    },
  }),
);

const tabs = [
  {
    label: 'Bạn bè',
    icon: <PeopleAltIcon />,
  },
  {
    label: 'Khám phá',
    icon: <SearchIcon />,
  },
  {
    label: 'Sách của tôi',
    icon: <MenuBookRoundedIcon />,
  },
  {
    label: 'Sách đã mượn',
    icon: <LocalLibraryRoundedIcon />,
  },
];

interface IProfileTabsProps {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileTabs: React.FC<IProfileTabsProps> = ({ tab, setTab }) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent, newValue: number) =>
    setTab(newValue);

  return (
    <Tabs
      classes={{ root: classes.tabRoot, indicator: classes.tabIndicator }}
      orientation="vertical"
      value={tab}
      onChange={handleChange}
      indicatorColor="primary"
    >
      {tabs.map((tab, idx) => (
        <Tab
          classes={{
            root: classes.tab,
            wrapper: classes.tabWrapper,
            selected: classes.tabSelected,
          }}
          key={idx}
          label={tab.label}
          icon={tab.icon}
          value={idx}
        />
      ))}
    </Tabs>
  );
};

interface IProfileInfoProps {
  profile: any;
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileInfo: React.FC<IProfileInfoProps> = ({ profile, tab, setTab }) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      alignItems="center"
    >
      <Grid
        item
        container
        className={classes.profile}
        direction="column"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Avatar className={classes.avatar} src={profile.photoURL} />
        </Grid>
        <Grid item>
          <Typography variant="h5" align="center" gutterBottom>
            {profile.fullName}
          </Typography>
          <Typography variant="body1" align="center">
            {profile.room}
          </Typography>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item container spacing={2}>
          <Grid item xs={4} container direction="column" alignItems="center">
            <Typography className={classes.profileStat} variant="h6">
              2
            </Typography>
            <Typography variant="subtitle2">Cho mượn</Typography>
          </Grid>
          <Grid item xs={4} container direction="column" alignItems="center">
            <Typography className={classes.profileStat} variant="h6">
              2
            </Typography>
            <Typography variant="subtitle2">Đã mượn</Typography>
          </Grid>
          <Grid item xs={4} container direction="column" alignItems="center">
            <Typography className={classes.profileStat} variant="h6">
              {profile.reviews}
            </Typography>
            <Typography variant="subtitle2">Review</Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item container>
          <ProfileTabs tab={tab} setTab={setTab} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileInfo;
