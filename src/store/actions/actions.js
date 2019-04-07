import axios from 'axios';
import { actionTypes } from './constants';

export const userLogin = (user) => {
    return dispatch => {
      dispatch(loginRequest(user));
      axios.post('/users/authenticate', {username: user.username,password: user.password})
        .then(res => {
          dispatch(loginSuccess(res.data));
          return res;
        })
        .catch(err => {
          dispatch(loginFailure());
          dispatch(logoutRequest());
          return err;
        });
    };
};

export const userLogout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  return dispatch => {
    dispatch(logoutRequest());
  };
};

const loginRequest = (user) => ({
    type: actionTypes.LOGIN_REQUEST,
    user: user
});

const loginSuccess = (data) => ({
    type: actionTypes.LOGIN_SUCCESS,
    user: data
});

const loginFailure = () => ({
  type: actionTypes.LOGIN_FAILURE
});

const logoutRequest = () => ({
  type: actionTypes.LOGOUT
});


export const userRegister = (user) => {
  return dispatch => {
    dispatch(registerRequest(user));
    axios.post('/users/register', user)
      .then(res => {
        dispatch(registerSuccess());
        return res;
      })
      .catch(err => {
        dispatch(registerFailure());
        return err;
      });
  };
};

const registerRequest = () => ({
  type: actionTypes.REGISTER_REQUEST
});

const registerSuccess = () => ({
  type: actionTypes.REGISTER_SUCCESS
});

const registerFailure = () => ({
  type: actionTypes.REGISTER_FAILURE
});


export const userDelete = (id) => {
  return dispatch => {
    dispatch(deleteRequest());
    axios.delete(`/users/${id}`) // jwt token already in axios
      .then(res => {
        dispatch(deleteSuccess());
        userLogout(); // logOut
        return res;
      })
      .catch(err => {
        dispatch(deleteFailure());
        return err;
      });
  };
};

const deleteRequest = () => ({
  type: actionTypes.DELETE_REQUEST
});

const deleteSuccess = () => ({
  type: actionTypes.DELETE_SUCCESS
});

const deleteFailure = () => ({
  type: actionTypes.DELETE_FAILURE
});