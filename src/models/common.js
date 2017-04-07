import i18n from '../../i18n.json';


export default {
  namespace: 'common',
  state: {
    client: '',
    language: 'zh-CN',
    messages: {},
  },
  reducers: {
    init(state, action) {
      return {
        ...state, ...action.payload,
      };
    },
    changeLanguage(state, action) {
      localStorage.setItem('locale', action.payload.language);
      history.go(0);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {},
  subscriptions: {
    setup({ dispatch }) {
      let client;
      const language = localStorage.getItem('locale') || navigator.language || (navigator.languages && navigator.languages[0]) || navigator.userLanguage;

      // const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
      const messages = i18n[language];

      const { userAgent } = navigator;

      if (userAgent.includes('Electron')) {
        client = 'electron';
      }

      dispatch({ type: 'init', payload: { language, messages, client } });
    },
  },
};
