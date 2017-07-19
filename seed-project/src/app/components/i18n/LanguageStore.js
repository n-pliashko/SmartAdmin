import Reflux from 'reflux'

import LanguageActions from './LanguageActions'

const data = {
    language: {
        key: "en",
        alt: "United States",
        title: "English (US)"
    },
    languages: [],
    phrases: {}
};

const LanguageStore = Reflux.createStore({
    listenables: LanguageActions,
    getData: function(){
        return data
    },
    onInitCompleted: function (_data, group_langs) {
        data.languages = _data;
        let selected_lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : group_langs[0];
        selected_lang = selected_lang.toLowerCase();
        localStorage.setItem('lang', selected_lang);
        data.language = _data.find(obj => obj.key === selected_lang);
        this.trigger(data)
    },
    onSelectCompleted: function (_data) {
        data.phrases = _data;
        this.trigger(data)
    },
    setLanguage: function(_lang){
        data.language = _lang
    }
});

export default LanguageStore;

