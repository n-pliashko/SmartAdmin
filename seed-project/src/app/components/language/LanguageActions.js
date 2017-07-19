
export const CHANGE_LANG = 'CHANGE_LANG'
export const INIT_LANG = 'INIT_LANG'

export function setLanguage(language) {
  return (dispatch) => {
    localStorage.setItem('lang', language)
    dispatch({
      type: CHANGE_LANG,
      lang: language
    });
  }
}

export function initLanguages(languages) {
  return (dispatch) => {
    dispatch({
      type: INIT_LANG,
      languages
    });
  }
}

