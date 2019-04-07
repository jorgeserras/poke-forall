import { actionTypes } from '../actions/constants';
import history from '../../helpers/history';
import Swal from 'sweetalert2';

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { loggedIn: true, user } : {};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.user));
      localStorage.setItem('token', JSON.stringify(action.user.token));
      Swal.fire({ // Alert
        title: "Login successful",
        text: "Lets go catch them all!",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "#009933",
        confirmButtonText: "Ok"
      }).then((result) => {
        if (result.value) {
          window.location = '/dex/pokemon';
        }
      });
      return {
        loggedIn: true,
        user: action.user
      };
    case actionTypes.LOGIN_FAILURE:
      console.log("LOGIN_FAILURE");
      return {
        ...state
      };
    case actionTypes.LOGOUT:
      console.log("LOGOUT");
      history.push('/login');
      return {
        ...state,
        loggedIn: false
      };
    default:
      return state;
  }
};

export default authentication;