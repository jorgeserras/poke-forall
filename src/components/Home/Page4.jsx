import React from 'react';
import { Carousel } from 'antd';
import { page4 } from './data';

const style = {
  textAlign: 'center'
};

const style_carousel = {
  background: '#1890FF'
};

export default function Page4() {
  const children = page4.map((item, i) => (
    <div key={i.toString()}>
      <img key="user" className="user" src={item.avatar} alt="" />
      <div key="comment" className="comment">
        <span >{item.comment}</span>
      </div>
      <h4 style={style} key="name">{item.name}</h4>
      <p style={style} key="pro">{item.profile}</p>
    </div>
  ));
  return (
    <div component="section" className="page-wrapper page4">
      <div>
        <div key="1" className="carousel-wrapper">
          <Carousel className="carousel_custom" style={style_carousel} effect="fade">
            {children}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
