
import {NAVIGATION_INIT} from './NavigationActions'
import {USER_ACCESS} from '../user/UserActions'

export default function navigationReducer(state = {
  items: []
}, action){

  switch (action.type){
    case NAVIGATION_INIT:
      return {
        items: action.items
      };
    case USER_ACCESS: {
      let {access} = action
      const {items} = state
      //access[0].collection_name = 'gettext';
      let allowed_items = [];
      items.map(item => {
        if (access.findIndex(el => el.collection_name === '*' || el.collection_name === item.collection_name) !== -1)
          allowed_items.push(item);
      })
      return {items: allowed_items}
    }
    default:
      return state

  }

}