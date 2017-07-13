import { USER_INFO } from '../user/UserActions'

export default function redirectReducer (state = {
  redirect: '/'
}, action ){
  switch (action.type){
    case USER_INFO:
      return {...state, redirect: action.redirect}
    default:
      return state
  }
}