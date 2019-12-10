import { Theme, Typography, Box, CardMedia, Link } from '@material-ui/core';
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		background: {
			display: 'flex',
			backgroundColor: '#0f141f',
			justifyContent: 'space-between',
			color: '#ffffff',
			padding: '40px 15%',
		},
		leftContainer: {},
		rightContainer: {
			display: 'flex',
			justifyContent: 'center'
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
			borderRadius: '50%'
		},
		linkContainer: {
			display: 'flex',
			flexDirection: 'column'
		},
		navTitle: {
			textTransform: 'uppercase',
			color: '#3d4047',
			marginBottom: '8px',
			fontSize: '14px'
		},
		navLink: {
			textDecoration: 'none',
			cursor: 'pointer',
			color: '#fff',
			marginBottom: '8px',
			'&:hover' : {
				color: '#ddd'
			}
		}


	}),
);

const Footer: React.FC = () => {
	const footer = useStyles();
	return (
		<Box className = {footer.background}>
			<Box className = {footer.leftContainer}>
				<Typography>
					Kết nối với chúng tôi
				</Typography>
				<Box className={footer.socialIconContainer}>
					<CardMedia
						className = {footer.socialIcon}
						image = '/img/fb.png'
					></CardMedia>
					<CardMedia
						className = {footer.socialIcon}
						image = '/img/twitter.png'
					></CardMedia>
				</Box>
			</Box>
			<Box className = {footer.rightContainer}>
				<Box className={footer.linkContainer}>
					<Typography className={footer.navTitle}>Hỗ trợ</Typography>
					<Link href='/contact' className={footer.navLink}>Liên hệ</Link>
					<Link href='/faq' className={footer.navLink}>Các câu hỏi thường gặp</Link>
					<Link href='/terms' className={footer.navLink}>Điều khoản dịch vụ</Link>
					<Link href='/about' className={footer.navLink}>Về chúng tôi</Link>
				</Box>
			</Box>
		</Box>
	);
};

export default Footer;