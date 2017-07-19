/**
 * Created by griga on 11/17/16.
 */


import { USER_INFO, USER_ACCESS, USER_GROUP } from './UserActions'

export default function userReducer (state = {

}, action ){
  switch (action.type) {
    case USER_INFO:
      return action.data
    case USER_ACCESS:
      return {...state, accessInfo: action.access}
    case USER_GROUP:
      return {...state, groupInfo: action.group}
    default:
      return state
  }
}