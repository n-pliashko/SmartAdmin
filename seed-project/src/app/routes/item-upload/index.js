export default {
  path: '/',
  component: require('../../components/common/Layout').default,
  childRoutes: [
    {
      path: 'item_upload',
      getComponent(nextState, cb){
        System.import('./containers/ItemUploadTable').then((m)=> {
          cb(null, m.default)
      })
      }
    }
  ]
};
