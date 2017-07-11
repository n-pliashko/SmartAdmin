/**
 * Created by griga on 11/24/15.
 */

import config from '../../config/config.json'
export const REQUEST_USER = 'REQUEST_USER'
export const USER_INFO = 'USER_INFO'

export function requestUserInfo() {
  return (dispatch) => {
    return $.get(config.urlApiHost + 'auth')
      .then((data) => {
        let userData = {}
        if (!data.error) {
          userData = data.manager;
        }
        dispatch({
          type: USER_INFO,
          data: userData
        });
      })
  }
}

export function authUser(userData)
{
  return (dispatch) => {
    dispatch({
      type: USER_INFO,
      data: userData
    })
  }
}


export function logoutUser()
{
  return (dispatch) => {
    return $.post(config.urlApiHost + 'auth/logout')
      .then((data) => {
        if (!data.error) {
          dispatch({
            type: USER_INFO,
            data: {}
          });
        }
      })
  }
}

