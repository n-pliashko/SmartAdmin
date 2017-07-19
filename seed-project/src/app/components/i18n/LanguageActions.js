import Reflux from 'reflux'
import store from '../../store/configureStore'

const LanguageActions = Reflux.createActions({
    init: {
        asyncResult: true
    },
    select: {
        asyncResult: true
    }
});

LanguageActions.init.listen( function() {
  $.getJSON('assets/api/langs/languages.json').then(languages => {
      const {user} = store.getState();
      if (!_.isEmpty(user) && user.groupInfo) {
          let group_langs = user.groupInfo.languages;
          let langs = [];
          languages.map(obj => {
            if (group_langs.indexOf(obj.key.toUpperCase()) !== -1) {
              langs.push(obj);
            }
          });
          this.completed(langs, group_langs);
      } else {
        return this.failed;
      }
    },
    this.failed
  )
});

LanguageActions.select.listen( function(language) {
  $.getJSON('assets/api/langs/' + language.key + '.json')
    .then(data => {
      const {user} = store.getState();
      let group_langs = [];
      if (!_.isEmpty(user) && user.groupInfo) {
          group_langs = user.groupInfo.languages;
      }
      this.completed(data, group_langs);
    }, this.failed)
});


export default LanguageActions;