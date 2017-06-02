export default {
  path: 'translations',
  component: require('../../components/common/Layout').default,
  childRoutes: [
    {
      path: '/gettexts',
      getComponent(nextState, cb){
        System.import('./containers/GettextsTable').then((m)=> {
          cb(null, m.default)
      })
      }
    }
  ]
};
