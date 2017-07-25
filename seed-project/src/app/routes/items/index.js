export default {
  path: 'items',
  name:'items',
  component: require('../../components/common/Layout').default,
  childRoutes: [
    {
      path: 'upload',
      getComponent(nextState, cb){
        System.import('./containers/upload/ItemUploadTable').then((m)=> {
          cb(null, m.default)
      })
      }
    },
    {
      path: 'images',
      getComponent(nextState, cb){
        System.import('./containers/images/ImagesContainer').then((m)=> {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'info',
      getComponent(nextState, cb){
        System.import('./containers/info/ItemsTable').then((m)=> {
          cb(null, m.default)
        })
      }
    }
  ]
};
