import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { getAuthUser } from '../services/auth';
import { updateAccount, updateProfile } from '../services/user';
import { handleSSO } from '../utils/sso';


export default {
  namespace: 'user',
  state: {
    token: '',
    user: {},
    isUpdateSubmit: false,
  },
  reducers: {
    loginFromStorage(state, action) {
      return {
        ...state, ...action.payload,
      };
    },
    loginSuccess(state, action) {
      return {
        ...state, ...action.payload.data,
      };
    },
    updateProfile(state) {
      return {
        ...state,
        ...{
          isUpdateSubmit: true,
        },
      };
    },
    updateProfileSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        ...{
          isUpdateSubmit: false,
        },
      };
    },
    updateProfileFail(state) {
      return {
        ...state,
        ...{
          isUpdateSubmit: false,
        },
      };
    },
    updateAccount(state) {
      return {
        ...state,
        ...{
          isUpdateSubmit: true,
        },
      };
    },
    updateAccountSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        ...{
          isUpdateSubmit: false,
        },
      };
    },
    updateAccountFail(state) {
      return {
        ...state,
        ...{
          isUpdateSubmit: false,
        },
      };
    },
    storeToken(state, action) {
      return {
        ...state, ...action.payload,
      };
    },
    preLoginSuccess(state, action) {
      return {
        ...state, ...action.payload,
      };
    },
    getAuthUserSuccess(state, action) {
      return {
        ...state, ...action.payload,
      };
    },
  },
  effects: {
    *loginSuccess({ payload }, { put }) {
      const { data: { user, token } } = payload;
      if (!payload.data) {
        message.error('error ');
      }
      if (token) {
        yield put({ type: 'storeToken', payload: { token } });
        localStorage.setItem('token', token);
      }

      if (user) {
        if (handleSSO(user)) {
          return;
        }


        if (user.active) {
          yield put(routerRedux.replace('/profiles'));
          // message.info("登录成功")
        } else {
          yield put(routerRedux.replace('/verify'));
        }
      }
    },
    *getAuthUser({ payload }, { call, put }) {
      const { token } = payload;

      try {
        const { data } = yield call(getAuthUser, { token });
        if (data) {
          yield put({ type: 'getAuthUserSuccess', payload: { user: data, token } });
        }
      } catch (error) {
        yield put({ type: 'getAuthUserFail' });
        // message.error(error.message)
      }
    },
    *preLogin({ payload }, { call, put }) {
      const { token } = payload;

      if (!token) {
        yield put(routerRedux.replace('/signin'));
      }

      try {
        const { data } = yield call(getAuthUser, { token });
        if (data) {
          if (handleSSO(data)) {
            return;
          }

          if (data.active) {
            yield put(routerRedux.replace('/profiles'));
          } else {
            yield put(routerRedux.replace('/signin'));
          }
        }
      } catch (error) {
        yield put(routerRedux.replace('/signin'));
        // message.error(error.message)
      }
    },
    *updateProfile({ payload }, { call, put, select }) {
      message.destroy();

      const token = yield select(state => state.user.token);
      const { messages } = yield select(state => state.common);
      try {
        const { data } = yield call(updateProfile, { ...payload, token });

        if (data) {
          yield put({ type: 'updateProfileSuccess', payload: { user: data, token } });
          message.info(messages.update_success);
        }
      } catch (error) {
        yield put({ type: 'updateProfileFail' });
        message.error(error.message);
      }
    },
    *updateEmail({ payload }, { call, put, select }) {
      const { messages } = yield select(state => state.common);
      try {
        const token = yield select(state => state.user.token);
        const { data } = yield call(updateAccount, { ...payload, token });
        if (data) {
          yield put({ type: 'updateAccountSuccess', payload: { user: data, token } });
          message.info(messages['A-verification-email-has-been-sent-to-you,please-check-the-mail-to-complete.']);
        }
      } catch (error) {
        yield put({ type: 'updateAccountFail' });
        message.error(messages[error.message] || error.message);
      }
    },

    *updateAccount({ payload }, { call, put, select }) {
      const { messages } = yield select(state => state.common);
      try {
        const token = yield select(state => state.user.token);
        const { data } = yield call(updateAccount, { ...payload, token });
        if (data) {
          yield put({ type: 'updateAccountSuccess', payload: { user: data, token } });
          message.info(messages.update_success);
        }
      } catch (error) {
        yield put({ type: 'updateAccountFail' });
        message.error(messages[error.message] || error.message);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      const token = localStorage.getItem('token');
      if (token) {
        dispatch({ type: 'getAuthUser', payload: { token } });
      } else {
        if(location.pathname == '/profiles') {
          dispatch(routerRedux.replace('/signin'))
        }
      }

      history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'preLogin', payload: { token } });
        }
        if (pathname === '/reset' || pathname == "/activate"){
          if (!query["key"]) {
            message.error("缺少参数")
          }
        }
      });
    },
  },
};
