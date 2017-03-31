export default {
  namespace: 'common',
  state: {
    language: 'zh-CN'
  },
  reducers: {
    init(state, action){
      return {
        ...state, ...action.payload
      }
    }
  },
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      const language = navigator.language || (navigator.languages && navigator.languages[0]) || navigator.userLanguage;
      const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

      dispatch({type: "init", payload: { language: languageWithoutRegionCode }})
    }
  },
};
