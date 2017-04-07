import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { activate, checkUserExists, forgot, login, register, reset } from '../services/auth';


export default {
  namespace: 'auth',
  state: {
    input: {},
    activateState: false,
    checkEmail: '',
    checkUsername: '',
    isSendEmailActive: false,
    isEmailExists: false,
    isUserNameExists: false,
    isRegisterSubmit: false,
    isLoginSubmit: false,
    isForgotSubmit: false,
    isSpinSubmit: false,
    isActivateSubmit: false,
    register: {},
  },
  reducers: {
    signOut(state) {
      console.log('sign out');
      localStorage.removeItem('token');
      location.href = '/';
      return state;
    },
    change(state, action) {
      return {
        ...state, ...action.payload,
      };
    },
    checkEmail(state) {
      return {
        ...state,
        ...{
          checkEmail: 'validating',
        },
      };
    },
    checkUsername(state) {
      return {
        ...state,
        ...{
          checkUsername: 'validating',
        },
      };
    },
    activate(state) {
      return {
        ...state,
        ...{
          activateState: true,
        },
      };
    },
    check(state, action) {
      return {
        ...state, ...action.payload,
      };
    },
    register(state) {
      return {
        ...state,
        ...{
          isRegisterSubmit: true,
        },
      };
    },
    registerSuccess(state) {
      return {
        ...state,
        ...{
          isRegisterSubmit: false,
        },
      };
    },
    registerFail(state) {
      return {
        ...state,
        ...{
          isRegisterSubmit: false,
        },
      };
    },
    login(state) {
      return {
        ...state,
        ...{
          isLoginSubmit: true,
        },
      };
    },
    loginSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        ...{
          isLoginSubmit: false,
        },
      };
    },
    loginFail(state) {
      return {
        ...state,
        ...{
          isLoginSubmit: false,
        },
      };
    },
    forgot(state) {
      return {
        ...state,
        ...{
          isForgotSubmit: true,
        },
      };
    },
    forgotSuccess(state) {
      return {
        ...state,
        ...{
          isForgotSubmit: false,
        },
      };
    },
    forgotFail(state) {
      return {
        ...state,
        ...{
          isForgotSubmit: false,
        },
      };
    },
    reset(state) {
      return {
        ...state,
        ...{
          isResetSubmit: true,
        },
      };
    },
    resetSuccess(state) {
      return {
        ...state,
        ...{
          isResetSubmit: false,
        },
      };
    },
    resetFail(state) {
      return {
        ...state,
        ...{
          isResetSubmit: false,
        },
      };
    },
  },
  effects: {
    *activate({ payload }, { call, select }) {
      const { messages } = yield select(state => state.common);
      try {
        const { data } = yield call(activate, payload);
        if (data) {
          message.success(messages['Your-account-has-been-successfully-activated!'], 3);
        }
      } catch (error) {
        message.error(error.message, 3);
      }
    },
    *checkEmail({ payload }, { call, put }) {
      if (!payload.email) {
        yield put({ type: 'check', payload: { checkEmail: 'error' } });
        return;
      }

      try {
        const { data } = yield call(checkUserExists, {
          email: payload.email,
          user_id: payload.user_id,
        });
        if (data) {
          yield put({ type: 'check', payload: { isEmailExists: true, checkEmail: 'warning' } });
        }
      } catch (error) {
        yield put({ type: 'check', payload: { isEmailExists: false, checkEmail: 'success' } });
      }
    },
    *checkUsername({ payload }, { call, put }) {
      if (!payload.username) {
        yield put({ type: 'check', payload: { checkUsername: 'error' } });
        return;
      }

      try {
        const { data } = yield call(checkUserExists, {
          username: payload.username,
          user_id: payload.user_id,
        });
        if (data) {
          yield put({ type: 'check', payload: { isUserNameExists: true, checkUsername: 'warning' } });
        }
      } catch (error) {
        yield put({ type: 'check', payload: { isUserNameExists: false, checkUsername: 'success' } });
      }
    },
    *login({ payload }, { call, put, select }) {
      const { messages } = yield select(state => state.common);
      try {
        const { data } = yield call(login, payload);

        if (data) {
          yield put({ type: 'loginSuccess', payload: { input: payload } });
          yield put({ type: 'user/loginSuccess', payload: { data } });
        }
      } catch (error) {
        yield put({ type: 'loginFail' });
        message.error(messages[error.message] || error.message, 3);
      }
    },
    *forgot({ payload }, { call, put, select }) {
      const { messages } = yield select(state => state.common);
      try {
        const { data } = yield call(forgot, payload);
        if (data) {
          yield put({ type: 'forgotSuccess' });
          message.info(messages['A-password-reset-email-has-been-sent-to-you.'], 3);
        }
      } catch (error) {
        yield put({ type: 'forgotFail' });
        message.error(messages[error.message] || error.message, 3);
      }
    },
    *register({ payload }, { call, put, select }) {
      const { messages } = yield select(state => state.common);
      try {
        const { data } = yield call(register, payload);
        if (data) {
          yield put({ type: 'registerSuccess' });

          yield put({ type: 'user/loginSuccess', payload: { data } });
          yield put({ type: 'loginSuccess', payload: { input: payload } });
          message.info(messages['Your-account-has-been-created.'], 3);
          yield put(routerRedux.replace('/verify'));
        }
      } catch (error) {
        yield put({ type: 'registerFail' });
        message.error(messages[error.message] || error.message, 3);
      }
    },
    *reset({ payload }, { call, put, select }) {
      const { messages } = yield select(state => state.common);
      try {
        const { data } = yield call(reset, payload);
        if (data) {
          yield put({ type: 'resetSuccess' });
          message.info(messages.update_success, 3);
        }
      } catch (error) {
        yield put({ type: 'resetFail' });
        message.error(messages[error.message] || error.message, 3);
      }
    },
  },
  subscriptions: {},
};
