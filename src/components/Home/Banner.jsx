import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import BannerImage from './BannerImage';

class Banner extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    navToShadow: PropTypes.func,
  }
  static defaultProps = {
    className: 'banner',
  }
  render() {
    const { className, navToShadow } = this.props;
    return (
      <div component="section" className={`${className}-wrapper page`} onChange={navToShadow}>
        <div className={className}>
          <div className={`${className}-img-wrapper`}>
            {<BannerImage />}
          </div>
          <div className={`${className}-text-wrapper`}>
            <h1 style={{marginLeft: '20px'}} key="h1">PokeForAll</h1>
            <p className="main-info" style={{marginLeft: '20px'}} key="p">
              Search for your favorite pokemons! All information updated through a database, including material from every generation!
            </p>
            <a href="/dex/pokemon" key="a">
              <Button style={{marginLeft: '20px'}} type="primary">
                Let's go!
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
