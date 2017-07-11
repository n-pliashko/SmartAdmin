import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, hashHistory} from 'react-router'

import store from './store/configureStore'

const history = syncHistoryWithStore(hashHistory, store);

const routes = {
  path: '/',
  indexRoute: {
    onEnter: (nextState, replace) => {
      replace('/login');
    }
  },
  childRoutes: [
    require('./routes/auth').default,
    {
      component: require('../app/components/user/containers/EnsureLoggedIn').default,
      childRoutes: [
        require('./routes/items').default,
        require('./routes/translations').default,
        require('./routes/not-found').default
      ]
    }
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
