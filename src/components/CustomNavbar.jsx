import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './CustomNavbar.css';
import { userLogout } from '../store/actions/actions';

import { Layout, Menu} from 'antd';
const { Header } = Layout;

class CustomNavbar extends Component {
  render() {
    let navLog = <Link className="nav-link" to="/login">Sign In</Link>;
    let navUserName = null;
    if(this.props.loggedIn){ 
     navLog = <div onClick={this.props.logoutUser}>Sign Out</div>;
     navUserName = <div className="nav-username">{this.props.user.username}</div>;
    }

    return (
      <Header id="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >   
            <Menu.Item style={{ marginLeft: '50px'}} key="1"><Link className="nav-link" to="/">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link className="nav-link" to="/dex/pokemon">Pokedex</Link></Menu.Item>
            <Menu.Item key="3"><Link className="nav-link" to="/register">Register</Link></Menu.Item>
            <Menu.Item key="4"><Link className="nav-link" to="/user">User Page</Link></Menu.Item>
            
            {/* <Menu.Item style={{ marginLeft: '20%'}} key="5" ></Menu.Item> */}
            <Menu.Item key="6" >{navUserName}</Menu.Item>
            <Menu.Item key="7" >{navLog}</Menu.Item>
          </Menu>
      </Header>
    )
  }
}

const mapStateToProps = state => {
    return {
      loggedIn: state.authentication.loggedIn,
      user: state.authentication.user
    };
};

const mapDispatchToProps = dispatch => {
  return {
      logoutUser: () => dispatch(userLogout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavbar);
