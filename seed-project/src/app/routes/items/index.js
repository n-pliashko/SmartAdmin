export default {
  path: '/',
  name:'items',
  component: require('../../components/common/Layout').default,
  childRoutes: [
    {
      path: 'items/upload',
      getComponent(nextState, cb){
        System.import('./containers/upload/ItemUploadTable').then((m)=> {
          cb(null, m.default)
      })
      }
    },
    {
      path: 'items/images',
      getComponent(nextState, cb){
        System.import('./containers/images/ImagesContainer').then((m)=> {
          cb(null, m.default)
        })
      }
    }
  ]
};
