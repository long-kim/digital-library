import { Box, Grid, Theme } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { createStyles, makeStyles } from '@material-ui/styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: '0 0 1rem',
      fontWeight: 'bold',
    },
    cardImage: {
      width: '100%',
      height: '100%',
    },
    bookContainer: {
      width: '11.75rem',
      height: '18.75rem',
      backgroundColor: '#000',
    },
    arrow: {
      width: '38.6px',
      height: '38.6px',
      backgroundColor: '#b9b9b9',
      borderRadius: '50%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    slides: {
      position: 'relative',
    },
  }),
);

interface arrowProps {
  onClick: any;
  style: any;
  className: any;
}
function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  const classes = useStyles();
  return (
    <Box onClick={onClick} className={classes.arrow} style={{ left: '-4rem' }}>
      <ArrowForwardIosIcon
        style={{ color: '#fff', transform: 'rotate(180deg)', fontSize: '30px' }}
      />
    </Box>
  );
}

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  const classes = useStyles();
  return (
    <Box onClick={onClick} className={classes.arrow} style={{ right: 0 }}>
      <ArrowForwardIosIcon style={{ color: '#fff', fontSize: '30px' }} />
    </Box>
  );
}

interface slickProps {
  data: any;
  Item: any;
}

export default function Slick(props: slickProps) {
  const { data, Item } = props;

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: 'slides',
    arrow: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  if (data.length < 4) {
    return (
      <Grid container>
        {data.map((item: any, index: number) => (
          <Grid key={index} item style={{ marginRight: '2rem' }}>
            <Item {...item} />
          </Grid>
        ))}
      </Grid>
    );
  }
  return (
    <Slider {...settings}>
      {data.map((item: any, index: number) => (
        <Item key={index} {...item} />
      ))}
    </Slider>
  );
}
