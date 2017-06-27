export default {
  path: '/',
  component: require('../../components/common/Layout').default,
  childRoutes: [
    {
      path: 'items/item_upload',
      getComponent(nextState, cb){
        System.import('./containers/item-upload/ItemUploadTable').then((m)=> {
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
