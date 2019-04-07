import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userDelete } from '../store/actions/actions';
import Banner from './Banner';
import { Row, Col, Button } from 'antd';

class UserPage extends Component {

    handleDelete = () => {
        console.log(this.props.user._id);
        this.props.deleteUser(this.props.user._id);
    }

  render() {
    let userContent = <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}><h2>You are not logged in!</h2><Link to="/login" className="btn btn-primary">Login</Link></Col>;
    if(this.props.loggedIn){
        userContent = <Col xs={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }}>
                        <h2>Hi {this.props.user.firstName} {this.props.user.lastName}!</h2>
                        <p>You can delete this account by pressing the button below.</p>
                        <div className="form-group">
                            <Button onClick={this.handleDelete} className="btn btn-primary">Delete</Button>
                        </div>
                      </Col>;
    }
    return (
      <div>
        <Banner/>
        <Row className="centered-content">
          {userContent}
        </Row>
      </div>
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
        deleteUser: (id) => {dispatch(userDelete(id))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);