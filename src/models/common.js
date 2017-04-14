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
      const languageY = localStorage.getItem('locale') || navigator.language || (navigator.languages && navigator.languages[0]) || navigator.userLanguage || 'zh-CN';

      const anguageWithoutRegionCode = languageY.toLowerCase().split(/[_-]+/)[0];
      const language = anguageWithoutRegionCode === 'zh' ? 'zh-CN' : 'en-US';
      const messages = i18n[language];



      if (navigator.userAgent && navigator.userAgent.indexOf('Electron') > -1) {
        client = 'electron';
      }

      dispatch({ type: 'init', payload: { language, messages, client } });
    },
  },
};
