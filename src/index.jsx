import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/reducers';
import axios from 'axios';
import Swal from 'sweetalert2';
//import history from './helpers/history';

axios.defaults.baseURL = 'https://safe-headland-96593.herokuapp.com';
//axios.defaults.baseURL = 'http://localhost:4000'; // for the server running in the /server folder
axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('token')); // need to concatenate 'Bearer ' before the token
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error.response.response);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Edit request config
    return response;
}, error => {
    console.log(JSON.parse(error.request.response).message);
    if (401 === error.response.status) {
        Swal.fire({
            title: "Session Expired",
            text: "You are not signed in or the session has expired. Would you like to be redirected to the login page?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.value) {
              //history.push('/login');
              window.location = '/login';
            }
        });
        //dispatch(logoutRequest());
    } else {
        console.log(error.request);
        Swal.fire({
            title: "Error " + error.response.status,
            text: JSON.parse(error.request.response).message,
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes"
        }, function(){
            window.location = '/login';
        });
        return Promise.reject(error);
    }
});

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();