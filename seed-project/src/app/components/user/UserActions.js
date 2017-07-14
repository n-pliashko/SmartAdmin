import config from '../../config/config.json'
import { showDialogError } from '../ui/uiDialog'
import { hashHistory } from 'react-router'

export const REQUEST_USER = 'REQUEST_USER'
export const USER_INFO = 'USER_INFO'
export const USER_ACCESS = 'USER_ACCESS'

export function requestUserInfo() {
  const token = localStorage.getItem('token');
  localStorage.setItem('lang', 'en');
  return (dispatch) => {
    if (token !== null) {
      return $.ajax({
        url: config.urlApiHost + 'token/data',
        headers: {
          'Authorization': token
        },
        method: 'GET',
        dataType: 'JSON',
      }).then((data) => {
        if (!data.error) {
          dispatch(authUser(data));
          dispatch(requestUserAccess());
        } else {
          dispatch(showErrorAuth(data.error));
        }
      }).fail(function (error) {
        console.log(error);
        error = JSON.parse(error.responseText).error;
        hashHistory.push('/login');
        dispatch(showErrorAuth(error));
      })
    }
  }
}

export function requestUserAccess() {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    if (token !== null) {
      return $.ajax({
        url: config.urlApiHost + 'token/access',
        headers: {
          'Authorization': token
        },
        method: 'GET',
        dataType: 'JSON',
      }).then((data) => {
        if (!data.error) {
          dispatch({
            type: USER_ACCESS,
            access: data
          });
        }
      }).fail(function (error) {
        console.log(error);
      })
    }
  }
}

export function authUser(userData) {
  return (dispatch) => {
    dispatch({
      type: USER_INFO,
      data: userData
    })
  }
}

export function showErrorAuth(error) {
  return (dispatch) => {
    console.log(error);
    error = typeof error === 'object' ? error.message : error;
    showDialogError('Error Authorization',error);
    dispatch(authUser({}))
  }
}

export function logoutUser() {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    return $.ajax({
      url: config.urlApiHost + 'token/cancel ',
      method: 'POST',
      dataType: 'JSON',
      headers: {
        'Authorization': token
      }
    }).then((data) => {
      if (!data.error) {
        localStorage.removeItem('token');
        localStorage.removeItem('lang');
        dispatch(authUser({}));
      }
    })
  }
}

