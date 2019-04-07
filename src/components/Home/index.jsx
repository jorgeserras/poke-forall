import React from 'react';
import Banner from './Banner';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import './static/style';

class Home extends React.PureComponent {
  state = {
    showShadow: false,
  };

  navToShadow = (e) => {
    this.setState({ showShadow: e.mode === 'leave' });
  }

  render() {
    return (
      [
        <Banner key="banner" navToShadow={this.navToShadow} />,
        <Page1 key="page1" />,
        <Page2 key="page2" />,
        <Page3 key="page3" />,
        <Page4 key="page4"/>,
      ]
    );
  }
}
export default Home;
