require('../../../assets/js/DataTables/datatables.min.css');

export default {
  path: '/',
  component: require('../../components/common/Layout').default,
  childRoutes: [
    {
      path: '/translations/gettexts',
      getComponent(nextState, cb){
        System.import('./containers/GettextsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/designers',
      getComponent(nextState, cb){
        System.import('./containers/DesignersTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/tints',
      getComponent(nextState, cb){
        System.import('./containers/TintsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/tint_cats',
      getComponent(nextState, cb){
        System.import('./containers/TintCatsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/pages',
      getComponent(nextState, cb){
        System.import('./containers/PagesTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/page_cats',
      getComponent(nextState, cb){
        System.import('./containers/PageCatsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/len_cats',
      getComponent(nextState, cb){
        System.import('./containers/LenCatsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/cats',
      getComponent(nextState, cb){
        System.import('./containers/CategoriesTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/omnis_statuses',
      getComponent(nextState, cb){
        System.import('./containers/OmnisStatusesTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/tabs',
      getComponent(nextState, cb){
        System.import('./containers/TabsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/user_notifications_msg',
      getComponent(nextState, cb){
        System.import('./containers/UserNotificationsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/category_groups',
      getComponent(nextState, cb){
        System.import('./containers/CategoryGroupsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/coatings',
      getComponent(nextState, cb){
        System.import('./containers/CoatingsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/colours',
      getComponent(nextState, cb){
        System.import('./containers/ColoursTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/countries',
      getComponent(nextState, cb){
        System.import('./containers/CountriesTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/delivery_methods',
      getComponent(nextState, cb){
        System.import('./containers/DeliveryMethodsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/frames',
      getComponent(nextState, cb){
        System.import('./containers/FramesTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/lenses',
      getComponent(nextState, cb){
        System.import('./containers/LensesTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/payment_systems',
      getComponent(nextState, cb){
        System.import('./containers/PaymentSystemsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/presc_use',
      getComponent(nextState, cb){
        System.import('./containers/PrescriptionUsedTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: '/translations/presc_use_cats',
      getComponent(nextState, cb){
        System.import('./containers/PrescUsedCategoriesTable').then((m) => {
          cb(null, m.default)
        })
      }
    }
  ]
};
