import config from '../../config/config.json'
import { showDialogError } from '../ui/uiDialog'
import { hashHistory } from 'react-router'
import {initLanguages} from '../language/LanguageActions'

export const REQUEST_USER = 'REQUEST_USER'
export const USER_INFO = 'USER_INFO'
export const USER_ACCESS = 'USER_ACCESS'
export const USER_GROUP = 'USER_GROUP'

export function requestUserInfo() {
  const token = localStorage.getItem('token');
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
          dispatch(getGroupInfo(data._group_id))
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

export function getGroupInfo(group_id) {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    $.ajax({
      url: config.urlApiHost + 'group/id/' + group_id,
      headers: {
        'Authorization': token
      },
      method:'GET',
      dataType: 'JSON',
    }).then((data) => {
      dispatch({
        type: USER_GROUP,
        group: data
      });
      dispatch(initLanguages(data.languages));
    }).fail(function (error) {
      error = JSON.parse(error.responseText).error;
      console.log(error);
      showDialogError('Error during get user group', error);
    })
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
        error = typeof error === 'object' ? error.message : error;
        showDialogError('Error Authorization',error);
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

