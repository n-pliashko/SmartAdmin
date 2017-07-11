export default {
  childRoutes: [
    {
      path: '*',
      getComponent(nextState, cb){
        System.import('./containers/NotFound').then((m)=> {
          cb(null, m.default)
        })
      }
    },
  ]

};
