const routes = {
  path: '/',
  indexRoute: {
    onEnter: (nextState, replace) => {
      replace('translations/gettexts');
    }
  },
  childRoutes: [
    require('./routes/auth').default,
    {
      component: require('../app/components/user/containers/EnsureLoggedIn').default,
      childRoutes: [
        require('./routes/items').default,
        require('./routes/translations').default,
        require('./routes/misc').default
      ]
    },
    require('./routes/not-found').default
  ]
};

export default routes;