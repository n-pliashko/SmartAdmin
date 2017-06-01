export default {
  path: '/',
  component: require('../../components/common/Layout').default,
  childRoutes: [
    {
      path: 'my_test',
      getComponent(nextState, cb){
        System.import('./containers/Test').then((m)=> {
          cb(null, m.default)
      })
      }
    }
  ]
};
