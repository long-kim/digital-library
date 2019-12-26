import { Theme } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { createStyles, makeStyles } from '@material-ui/styles';
import { NextPage } from 'next';
import React from 'react';
import { firebaseConfig } from '../../firebase/config';
import useFirebaseAuth from '../../pages/hooks/useFirebaseAuth';
import Comment from '../bookDetails/comment';
import Review from '../bookDetails/review';
import BorrowModal from '../modal/BorrowModal';
import Book from '../search/book';
import IReview from './IReview';

interface IHomeProps {
  pathname?: string;
}

interface IBook {
  name: string;
  img: string;
  url: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      width: '90%',
      height: '100%',
      margin: '0 auto',
    },
    top: {
      width: '100%',
      padding: '50px 0',
      display: 'flex',
      justifyContent: 'space-between',
      color: '#615e5e',
      fontSize: '18px',
    },
    detail: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    book_name: {
      fontSize: '28px',
      color: '#111111',
      marginTop: '30px',
    },
    rating: {
      display: 'flex',
      width: '230px',
      justifyContent: 'space-between',
    },
    overview: {
      marginTop: '40px',
    },
    to_cart_btn: {
      width: '180px',
      height: '45px',
      fontSize: '18px',
      borderRadius: '24px',
      border: 'solid 1px #8d8585',
      backgroundColor: '#8d8585',
      color: 'white',
      cursor: 'pointer',
      alignSelf: 'flex-end',
      transition: '0.2s',

      '&:hover': {
        backgroundColor: '#756f6f',
      },

      '&:active': {
        backgroundColor: '#665f5f',
      },
    },
    imgs: {
      width: '40%',
      display: 'flex',
    },
    main_img: {
      width: '55%',
      borderRadius: '11px',
    },
    side: {
      marginLeft: '45px',
      maxHeight: '600px',
      overflowY: 'scroll',
    },
    side_img: {
      display: 'block',
      width: '43%',
      borderRadius: '11px',
      marginBottom: '30px',
    },
    linebreak: {
      height: '3px',
      width: '100%',
      backgroundColor: '#d5cccc',
    },
    bot: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '60px',
    },
    left: {
      width: '50%',
    },
    header: {
      fontSize: '28px',
      color: '#3b3b3b',
      marginBottom: '25px',
    },
    right: {
      width: '40%',
    },
    related_books: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
  }),
);

const reviewList = [
  {
    ava:
      'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74443688_2387688291469423_6786064012900564992_o.jpg?_nc_cat=100&_nc_ohc=rMsccGHD9w0AQnU7Vlu8mAB5VRcugTbk-TA09KLB3spkfF8Xc31qCVF7g&_nc_ht=scontent.fsgn1-1.fna&oh=99a82a9d3d8844fbf955af48ce53421a&oe=5E7EF970',
    name: 'Thinh Tran',
    rate: 4,
    review:
      'However, they commented that it did tend to lag, especially at the end where two bad guys',
  },
  {
    ava:
      'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74443688_2387688291469423_6786064012900564992_o.jpg?_nc_cat=100&_nc_ohc=rMsccGHD9w0AQnU7Vlu8mAB5VRcugTbk-TA09KLB3spkfF8Xc31qCVF7g&_nc_ht=scontent.fsgn1-1.fna&oh=99a82a9d3d8844fbf955af48ce53421a&oe=5E7EF970',
    name: 'Thinh Tran',
    rate: 4,
    review:
      'However, they commented that it did tend to lag, especially at the end where two bad guys',
  },
  {
    ava:
      'https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/s960x960/74443688_2387688291469423_6786064012900564992_o.jpg?_nc_cat=100&_nc_ohc=rMsccGHD9w0AQnU7Vlu8mAB5VRcugTbk-TA09KLB3spkfF8Xc31qCVF7g&_nc_ht=scontent.fsgn1-1.fna&oh=99a82a9d3d8844fbf955af48ce53421a&oe=5E7EF970',
    name: 'Thinh Tran',
    rate: 4,
    review:
      'However, they commented that it did tend to lag, especially at the end where two bad guys',
  },
];

const relatedList = [
  {
    name: 'Conan',
    img: 'https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg',
    url: '#',
  },
  {
    name: 'Conan',
    img: 'https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg',
    url: '#',
  },
  {
    name: 'Conan',
    img: 'https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg',
    url: '#',
  },
  {
    name: 'Conan',
    img: 'https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg',
    url: '#',
  },
  {
    name: 'Conan',
    img: 'https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg',
    url: '#',
  },
  {
    name: 'Conan',
    img: 'https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg',
    url: '#',
  },
];

const list = [
  {
    fullname: 'Jim Tran',
    uid: 'abcxyz',
    bid: '12345',
  },
  {
    fullname: 'Jim Tran',
    uid: 'abcxyz',
    bid: '12345',
  },
  {
    fullname: 'Jim Tran',
    uid: 'abcxyz',
    bid: '12345',
  },
  {
    fullname: 'Jim Tran',
    uid: 'abcxyz',
    bid: '12345',
  },
  {
    fullname: 'Jim Tran',
    uid: 'abcxyz',
    bid: '12345',
  },
  {
    fullname: 'Jim Tran',
    uid: 'abcxyz',
    bid: '12345',
  },
];

const BookDetails: NextPage<IHomeProps> = ({ pathname }) => {
  const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);
  const classes = useStyles();

  const renderReviews = reviewList.map((review: IReview, i) => {
    return (
      
      <Review
        key={i}
        ava={review.ava}
        name={review.name}
        rate={review.rate}
        review={review.review}
      />
    );
  });

  const renderBooks = relatedList.map((book: IBook, i) => {
    return  <Book key={i} name={book.name} img={book.img} url={book.url}/>;
  });

  return (
    <div className={classes.body}>
      <div className={classes.top}>
        <div className={classes.detail}>
          <div>
            <div className={classes.book_name}>
              Harry Potter: và chiếc cốc lửa
            </div>
            <p>J.K. Rowling</p>
            <div className={classes.rating}>
              <Rating readOnly value={4} size="large" />
              <div>5.0</div>
            </div>
            <div className={classes.overview}>
              Harry Potter and the Goblet of Fire is a fantasy book written by
              British author J. K. Rowling and the fourth novel in the Harry
              Potter series. It follows Harry Potter, a wizard in his fourth
              year at Hogwarts School of Witchcraft and Wizardry, and the
              mystery surrounding the entry of Harry's name into the Triwizard
              Tournament, in which he is forced to compete. The book was
              published in the United Kingdom by Bloomsbury and in the United
              States by Scholastic. In both countries, the release date was 8
              July 2000. This was the first time a book in the series was
              published in both countries at the same time.
            </div>
          </div>
          <BorrowModal list={list} styles={classes.to_cart_btn}/>
        </div>
        <div className={classes.imgs}>
          <img
            className={classes.main_img}
            src="https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg"
          />
          <div className={classes.side}>
            <img
              className={classes.side_img}
              src="https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg"
            />
            <img
              className={classes.side_img}
              src="https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg"
            />
            <img
              className={classes.side_img}
              src="https://images-na.ssl-images-amazon.com/images/I/810BkqRP%2BiL.jpg"
            />
          </div>
        </div>
      </div>
      <div className={classes.linebreak}/>
      <div className={classes.bot}>
        <div className={classes.left}>
          <div className={classes.header}>Để lại bình luận</div>
          <Comment/>
          <div>{renderReviews};</div>
        </div>
        <div className={classes.right}>
          <div className={classes.header}>Tác phẩm liên quan</div>
          <div className={classes.related_books}>{renderBooks}</div>
        </div>
      </div>
    </div>
  );
};

BookDetails.getInitialProps = async ctx => {
  const pathname = ctx.pathname ? ctx.pathname : '/';
  return { pathname };
};

export default BookDetails;
