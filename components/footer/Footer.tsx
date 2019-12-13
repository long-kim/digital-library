import {
  Box,
  CardMedia,
  Container,
  Grid,
  Link,
  Theme,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerContainer: {
      marginTop: 'auto',
    },
    background: {
      display: 'flex',
      backgroundColor: '#0f141f',
      justifyContent: 'space-between',
      color: '#ffffff',
      padding: theme.spacing(4, 0),
      marginTop: 'auto',
    },
    leftContainer: {},
    rightContainer: {
      textAlign: 'right',
    },
    socialIconContainer: {
      display: 'flex',
      marginTop: '1em',
    },
    socialIcon: {
      width: '40px',
      height: '40px',
      marginRight: '1em',
      backgroundColor: '#fff',
      borderRadius: '50%',
    },
    linkContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    navTitle: {
      textTransform: 'uppercase',
      color: '#3d4047',
      marginBottom: '8px',
      fontSize: '14px',
    },
    navLink: {
      textDecoration: 'none',
      cursor: 'pointer',
      color: '#fff',
      marginBottom: '8px',
      '&:hover': {
        color: '#ddd',
      },
    },
  }),
);

const Footer: React.FC = () => {
  const footer = useStyles();
  return (
    <footer className={footer.footerContainer}>
      <Box className={footer.background}>
        <Grid
          container
          component={Container}
          maxWidth="lg"
          justify="space-between"
        >
          <Grid item xs={12} md={6} className={footer.leftContainer}>
            <Typography>Kết nối với chúng tôi</Typography>
            <Box className={footer.socialIconContainer}>
              <CardMedia className={footer.socialIcon} image="/img/fb.png" />
              <CardMedia
                className={footer.socialIcon}
                image="/img/twitter.png"
              />
            </Box>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            className={footer.rightContainer}
            justify="flex-end"
          >
            <Box className={footer.linkContainer}>
              <Typography className={footer.navTitle}>Hỗ trợ</Typography>
              <Link href="/contact" className={footer.navLink}>
                Liên hệ
              </Link>
              <Link href="/faq" className={footer.navLink}>
                Các câu hỏi thường gặp
              </Link>
              <Link href="/terms" className={footer.navLink}>
                Điều khoản dịch vụ
              </Link>
              <Link href="/about" className={footer.navLink}>
                Về chúng tôi
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};

export default Footer;
