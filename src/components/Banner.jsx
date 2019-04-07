import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
import './Banner.css';

const BgElement = Element.BgElement;

class Banner extends Component{
    render() {
        return (
            <BannerAnim prefixCls="banner-user" >
                <Element key="aaa"
                prefixCls="banner-user-elem"
                followParallax={{
                    delay: 1000,
                    data: [
                    { id: 'bg', value: 20, bgPosition: '50%', type: ['backgroundPositionX'] },
                    { id: 'title', value: 50, type: 'x' },
                    { id: 'content', value: -30, type: 'x' },
                    ],
                }}
                >
                <BgElement
                    key="bg"
                    className="bg"
                    style={{
                        backgroundImage: 'url(https://img.wallpapersafari.com/desktop/1920/1080/98/28/Dym19R.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    id="bg"
                />
                <TweenOne className="banner-user-title" 
                    animation={{ y: 30, opacity: 0, type: 'from' }}
                    id="title"
                    style={{ textAlign: 'left', marginLeft: '50px'}}
                >
                    PokeForAll
                </TweenOne>
                <TweenOne className="banner-user-text" 
                    animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                    id="content"
                    style={{ textAlign: 'left', marginLeft: '50px'}}
                >
                    Explore our user flow and find them all!
                </TweenOne>
                </Element>
                <Element key="bbb"
                prefixCls="banner-user-elem"
                >
                <BgElement
                    key="bg"
                    className="bg"
                    style={{
                        backgroundImage: 'url(https://www.pixelstalk.net/wp-content/uploads/2016/09/All-Pokemon-HD-Wallpaper.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    id="bg"
                />
                </Element>
            </BannerAnim>
        );
    }
}

export default withRouter(Banner);