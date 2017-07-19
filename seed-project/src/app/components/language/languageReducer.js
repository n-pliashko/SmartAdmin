
import { CHANGE_LANG, INIT_LANG } from './LanguageActions'

const data = {
  language: {
    key: localStorage.getItem('lang') ? localStorage.getItem('lang') : "en",
  },
  languages: []
};

export default function languageReducer (state = data, action ){
  switch (action.type) {
    case CHANGE_LANG:
      return {...state, language: {...state.language, key: action.lang}}
    case INIT_LANG: {
      return {...state, languages: action.languages}
    }
    default: {
      return state
    }
  }
}