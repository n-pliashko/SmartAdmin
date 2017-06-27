import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, hashHistory} from 'react-router'

import store from './store/configureStore'

const history = syncHistoryWithStore(hashHistory, store);

const routes = {

  path: '/',
  indexRoute: { onEnter: (nextState, replace) => replace('/items/item_upload') },
  childRoutes: [
    require('./routes/items').default,
    require('./routes/translations').default
  ]
};

ReactDOM.render((
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
    />
  </Provider>
), document.getElementById('smartadmin-root'));
