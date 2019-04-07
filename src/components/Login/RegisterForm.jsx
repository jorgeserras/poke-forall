import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userRegister } from '../../store/actions/actions';
import Banner from '../Banner';
import { Form, Input, Tooltip, Icon, Button, } from 'antd';

 class RegisterForm extends Component {

    state = {
        user: {
            firstName: '',
            lastName: '',
            username: '',
            password: ''
        },
        submitted: false,
        confirmDirty: false,
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
        //console.log("State: ", this.state);
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.setState({ submitted: true });
            const { user } = this.state;
            console.log('Received values of form: ', values);
            console.log('User to register: ', user);
            this.props.registerUser(user); // Dispatch the credentials
          }
        });
      }
    
      handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      }
    
      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter are inconsistent!');
        } else {
          callback();
        }
      }
    
      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }



  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };

    return (
      <div>
        <Banner/>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="registration-form">
        <Form.Item
          label={(
            <span>
              First name
            </span>
          )}
        >
          {getFieldDecorator('firstname', {
            rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
          })(
            <Input style={{width: '50%'}} name="firstName" onChange={this.handleChange} />
          )}
        </Form.Item>
        <Form.Item
          label={(
            <span>
              Last name
            </span>
          )}
        >
          {getFieldDecorator('lastname', {
            rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
          })(
            <Input style={{width: '50%'}} name="lastName" onChange={this.handleChange} />
          )}
        </Form.Item>
        <Form.Item
          label={(
            <span>
              Username&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
          })(
            <Input style={{width: '50%'}} name="username" onChange={this.handleChange} />
          )}
        </Form.Item>
        <Form.Item
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input style={{width: '50%'}} name="password" type="password" onChange={this.handleChange} />
          )}
        </Form.Item>
        <Form.Item
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input style={{width: '50%'}} type="password" name="password" onBlur={this.handleConfirmBlur} onChange={this.handleChange} />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </Form.Item>
      </Form>
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser: (credentials) => {dispatch(userRegister(credentials))}
    };
};

const WrappedRegisterForm = Form.create({ name: 'register' })(RegisterForm);

export default connect(null, mapDispatchToProps)(WrappedRegisterForm);