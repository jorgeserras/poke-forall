import { actionTypes } from '../actions/constants';
import Swal from 'sweetalert2';
import history from '../../helpers/history';

const initialState = {};

const users = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_REQUEST:
      //console.log("DELETE_REQUEST");
      return {};
    case actionTypes.DELETE_SUCCESS:
      //console.log("DELETE_SUCCESS");
      Swal.fire({ // Alert
        title: "Deletion successfull!",
        text: "Do you want to sign in again?",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "#009933",
        confirmButtonText: "Ok"
      }).then((result) => {
        if (result.value) {
          history.push('/login');
        }
      });
      return {};
    case actionTypes.DELETE_FAILURE:
      //console.log("DELETE_FAILURE");
      return {};
    default:
      return state;
  }
};

export default users;