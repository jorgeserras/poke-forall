import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin } from '../../store/actions/actions';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import Banner from '../Banner';

class LoginForm extends Component {

    state = {
        username: "",
        password: '',
        submitted: false
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const credentials = {username, password};
        // Dispatch the credentials
        if(username && password){
            this.props.loginUser(credentials);
        }
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Banner/>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <Form className="login-form">
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" name="username" onChange={this.handleChange} />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
                  Log in
                </Button>
                Or <Link to="/register" className="btn btn-primary">Register</Link>
              </Form.Item>
            </Form>
          </Col>
          <Col span={8}></Col>        
        </Row>
      </div>          
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (credentials) => {dispatch(userLogin(credentials))}
    };
};

const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default connect(null, mapDispatchToProps)(WrappedLoginForm);