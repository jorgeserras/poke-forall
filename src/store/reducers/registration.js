import { actionTypes } from '../actions/constants';
import Swal from 'sweetalert2';
//import history from '../../helpers/history';

const initialState = { submitted: false};

const registration = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
      //console.log("USERS_REGISTER_REQUEST");
      return {
        submitted: true
      };
    case actionTypes.REGISTER_SUCCESS:
      //console.log("USERS_REGISTER_SUCCESS");
      Swal.fire({ // Alert
        title: "Registration successfull!",
        text: "Do you want to sign in now?",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "#009933",
        confirmButtonText: "Ok"
      }).then((result) => {
        if (result.value) {
          //history.push('/login');
          window.location = '/login';
          //window.location.reload();
        }
      });
      return {};
    case actionTypes.REGISTER_FAILURE:
      //console.log("USERS_REGISTER_FAILURE");
      return {};
    default:
      return state;
  }
};

export default registration;