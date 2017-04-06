import i18n from '../../i18n.json';


export default {
  namespace: 'common',
  state: {
    language: 'zh-CN',
    messages: {},
  },
  reducers: {
    init(state, action) {
      return {
        ...state, ...action.payload,
      };
    },
  },
  effects: {},
  subscriptions: {
    setup({ dispatch }) {
      const language = localStorage.getItem('locale') || navigator.language || (navigator.languages && navigator.languages[0]) || navigator.userLanguage;

      const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
      const messages = i18n[languageWithoutRegionCode];

      dispatch({ type: 'init', payload: { language: languageWithoutRegionCode, messages } });
    },
  },
};
