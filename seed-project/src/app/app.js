import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, hashHistory} from 'react-router'

import routes_path from './routes';

import store from './store/configureStore'

const history = syncHistoryWithStore(hashHistory, store);


ReactDOM.render((
    <Provider store={store}>
      <Router
        history={history}
        routes={ routes_path}
      />
    </Provider>
  ), document.getElementById('smartadmin-root'));
