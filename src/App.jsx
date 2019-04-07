import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import history from './helpers/history';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/CustomNavbar';
import Home from './components/Home/index';
import Login from './components/Login/LoginForm';
import Register from './components/Login/RegisterForm';
import UserPage from './components/UserPage';
import NoMatch from './components/NoMatchPage';
import PokeTabs from './components/Pokedex/PokeTabs';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

class App extends Component {
  
  render() {
    return (
    <Router history={history}> {/* Allows to preform history.push("/") to redirect and re-render */}
      <Layout>
        <Navbar />
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          {/* <Banner /> */}
          <Switch> {/* Switch tells React to only activate one of the routes at a time (the first one that matches) */}
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/user" component={UserPage} />
            <PrivateRoute path="/dex/pokemon" component={PokeTabs}/>
            <Route component={NoMatch} /> 
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center', marginTop: '20px' }}>
          ©2019 Created by <a href="https://www.jorgeserras.com/" rel="noopener noreferrer" target="_blank">Jorge Serras</a>
        </Footer>
      </Layout>
    </Router>
    );
  }
}

export default App;
