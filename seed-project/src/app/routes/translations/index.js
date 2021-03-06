require('../../../assets/js/DataTables/datatables.min.css');

export default {
  path: 'translations',
  component: require('../../components/common/Layout').default,
  childRoutes: [
    {
      path: 'gettexts',
      getComponent(nextState, cb){
        System.import('./containers/GettextsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'designers',
      getComponent(nextState, cb){
        System.import('./containers/DesignersTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'tints',
      getComponent(nextState, cb){
        System.import('./containers/TintsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'tint_cats',
      getComponent(nextState, cb){
        System.import('./containers/TintCatsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'pages',
      getComponent(nextState, cb){
        System.import('./containers/PagesTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'page_cats',
      getComponent(nextState, cb){
        System.import('./containers/PageCatsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'len_cats',
      getComponent(nextState, cb){
        System.import('./containers/LenCatsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'cats',
      getComponent(nextState, cb){
        System.import('./containers/CategoriesTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'omnis_statuses',
      getComponent(nextState, cb){
        System.import('./containers/OmnisStatusesTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'tabs',
      getComponent(nextState, cb){
        System.import('./containers/TabsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'user_notifications_msg',
      getComponent(nextState, cb){
        System.import('./containers/UserNotificationsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'category_groups',
      getComponent(nextState, cb){
        System.import('./containers/CategoryGroupsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'coatings',
      getComponent(nextState, cb){
        System.import('./containers/CoatingsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'colours',
      getComponent(nextState, cb){
        System.import('./containers/ColoursTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'countries',
      getComponent(nextState, cb){
        System.import('./containers/CountriesTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'delivery_methods',
      getComponent(nextState, cb){
        System.import('./containers/DeliveryMethodsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'frames',
      getComponent(nextState, cb){
        System.import('./containers/FramesTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'lenses',
      getComponent(nextState, cb){
        System.import('./containers/LensesTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'payment_systems',
      getComponent(nextState, cb){
        System.import('./containers/PaymentSystemsTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'presc_use',
      getComponent(nextState, cb){
        System.import('./containers/PrescriptionUsedTable').then((m) => {
          cb(null, m.default)
        })
      }
    },
    {
      path: 'presc_use_cats',
      getComponent(nextState, cb){
        System.import('./containers/PrescUsedCategoriesTable').then((m) => {
          cb(null, m.default)
        })
      }
    }
  ]
};
