import React, { Component } from 'react';
import Navbar from '../components/navbar/Navbar';
import { firebaseConfig } from '../firebase/config';
// import useFirebaseAuth from '../hooks/useFirebaseAuth';

const searchTitle = {
  margin: '50px 20px 30px 73px',
  fontSize: '30px',
  fontStyle: 'italic',
};

const searchKetqua = {
  color: '#929292',
};

const searchKeyword = {
  color: '#3b3b3b',
};

const searchPagination = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '68px',
};

const searchBook = {
  width: '188px',
  height: '287px',
  backgroundSize: 'cover',
};

const searchDisplayBook = {
  display: 'grid',
  gridTemplateColumns: 'auto auto auto auto auto',
  margin: '0 73px 0 73px',
};

const searchSubTitle = {
  color: '#3b3b3b',
  fontSize: '17px',
  textDecoration: 'none',
};

let products = [
  { name: 'Percy Jackson book', img: '/img/book1.jpg' },
  { name: 'Percy Jackson book', img: '/img/book2.jpg' },
  { name: 'Percy Jackson book', img: '/img/book3.jpg' },
  { name: 'Percy Jackson book', img: '/img/book4.jpeg' },
  { name: 'Percy Jackson book', img: '/img/book5.jpeg' },
  { name: 'Percy Jackson book', img: '/img/book6.jpg' },
  { name: 'Percy Jackson book', img: '/img/book7.jpg' },
  { name: 'Percy Jackson book', img: '/img/book8.jpg' },
  { name: 'Percy Jackson book', img: '/img/book1.jpg' },
  { name: 'Percy Jackson book', img: '/img/book2.jpg' },
  { name: 'Percy Jackson book', img: '/img/book3.jpg' },
];

interface IProps {
  products: Array<Object>;
}

interface IState {
  totalPage?: number;
  currentPage: number;
  perPage: number;
  allProduct: Array<Object> | undefined;
}

class Search extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      totalPage: 0,
      currentPage: 1,
      perPage: 10,
      allProduct: products,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (param: any) => (event: any) => {
    if (param === 'forward') {
      if (
        this.state.currentPage < Math.ceil(products.length / this.state.perPage)
      ) {
        this.setState({
          currentPage: this.state.currentPage + 1,
        });
      }
    }

    if (param === 'back') {
      if (this.state.currentPage > 1) {
        this.setState({
          currentPage: this.state.currentPage - 1,
        });
      }
    }
  };

  render() {
    // const [user] = useFirebaseAuth(firebaseConfig);
    const indexOfLast = this.state.currentPage * this.state.perPage;
    const indexOfFirst = indexOfLast - this.state.perPage;
    let currentList: Array<Object>;
    currentList = [];
    if (products) {
      currentList = products.slice(indexOfFirst, indexOfLast);
    }
    const renderProduct = currentList.map((product: any, i) => {
      let url;
      url = '/display-product/' + product.name;
      return (
        <div key={i}>
          <a href={url} style={searchSubTitle}>
            <img src={product.img} alt={product.name} style={searchBook} />
            <div>
              <p style={{ marginTop: '0' }}>{product.name}</p>
            </div>
          </a>
        </div>
      );
    });
    return (
      <div>
        <Navbar page={'/'} user={undefined} />
        <div style={searchTitle}>
          <span style={searchKetqua}>Kết quả tìm kiếm: </span>
          <span style={searchKeyword}>Tiểu thuyết</span>
        </div>
        <div style={searchDisplayBook}>{renderProduct}</div>
        <div style={searchPagination}>
          <img
            src="/img/chevron-left-solid.svg"
            style={{
              width: '24px',
              height: '24px',
              cursor: 'pointer',
            }}
            onClick={this.handleClick('back')}
          />
          <p className="paginate-number">
            {this.state.currentPage}/
            {Math.ceil(products.length / this.state.perPage)}
          </p>
          <img
            src="/img/chevron-right-solid.svg"
            style={{
              width: '24px',
              height: '24px',
              cursor: 'pointer',
            }}
            onClick={this.handleClick('forward')}
          />
        </div>
      </div>
    );
  }
}

export default Search;
