import React, { Component } from 'react';

const searchBook = {
    width: '188px',
    height: '287px',
    backgroundSize: 'cover',
  };

const searchSubTitle = {
    color: '#3b3b3b',
    fontSize: '17px',
    textDecoration: 'none',
  };

interface IProps {
    key: number,
    name:string,
    img: string,
    url: string
  }
  
  interface IState {
  }
  
  class Book extends Component<IProps, IState> {
    constructor(props: any) {
      super(props);
      this.state = {
      };
      
    }
    render() {
        const prop = this.props
        return (
            <div key={prop.key}>
          <a href={prop.url} style={searchSubTitle}>
            <img src={prop.img} alt={prop.name} style={searchBook} />
            <div>
              <p style={{ marginTop: '0' }}>{prop.name}</p>
            </div>
          </a>
        </div>
        )
    }
}
  
export default Book;