
export default {
  namespace: 'haha',
  state: {
    text: '123213213'
  },
  reducers: {
    change(state, action) {
      return {
        ...state, ...action.payload        
      }
    }
  },
  effects: {},
  subscriptions: {},
};
