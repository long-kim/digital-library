import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import { NextPage } from 'next';
import React from 'react';
import { firebaseConfig } from '../../firebase/config';
import useFirebaseAuth from '../../pages/hooks/useFirebaseAuth';
import CateItem from './cateItem';
import ICate from './ICate';
import CateItemList from './cateItemList';

interface IHomeProps {
    pathname?: string;
  }  

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
        marginTop: '1.5rem',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
    },
    cateWrapper: {
        width: "90%",
        minHeight: '100vh',
        margin: '40px auto',
    }
  }),
);

const cateList = [
    {
        cateImg: 'http://tiny.cc/k0s0hz',
        cateName: 'Tiểu thuyết',
        bookCounts: 12,
    },
    {
        cateImg: 'http://tiny.cc/r1s0hz',
        cateName: 'Chính trị',
        bookCounts: 12,
    },
    {
        cateImg: 'https://sachvui.com/cover/2015/Dac-nhan-tam.jpg',
        cateName: 'Self-help',
        bookCounts: 12,
    },
    {
        cateImg: 'http://tiny.cc/u3s0hz',
        cateName: 'Truyện ngắn',
        bookCounts: 12,
    },
    {
        cateImg: 'https://salt.tikicdn.com/cache/550x550/media/catalog/product/n/x/nxbtre_full_06372017_103735.u547.d20170117.t105220.139884.jpg',
        cateName: 'Kinh tế',
        bookCounts: 12,
    },
    {
        cateImg: 'http://tiny.cc/25s0hz',
        cateName: 'Học ngoại ngữ',
        bookCounts: 12,
    },
    {
        cateImg: 'http://tiny.cc/a7s0hz',
        cateName: 'Ngoại văn',
        bookCounts: 12,
    },
    {
        cateImg: 'https://sachvui.com/cover/2018/giao-trinh-nhung-nguyen-ly-co-ban-cua-chu-nghia-mac-lenin.jpg',
        cateName: 'Giáo trình',
        bookCounts: 12,
    },
];

const Category: NextPage<IHomeProps> = ({ pathname }) => {
    const [user, handleLogin, handleLogout] = useFirebaseAuth(firebaseConfig);
    const classes = useStyles();
  
    const renderCateList = cateList.map((cate: ICate, i) => {
        return (
            <CateItem 
                key={i}
                cateImg={cate.cateImg}
                cateName={cate.cateName}
                bookCounts={cate.bookCounts}
            ></CateItem>
        );
    });


    return (
        <div className={classes.cateWrapper}>
            <h1>Thể loại sách:</h1>
            <div className={classes.body}>
                {renderCateList}
                {/* <CateItemList></CateItemList> */}
            </div>
        </div>
    );
}

Category.getInitialProps = async ctx => {
  const pathname = ctx.pathname ? ctx.pathname : '/';
  return { pathname };
};

export default Category;
