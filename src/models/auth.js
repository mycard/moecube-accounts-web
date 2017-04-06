import { login, forgot, register, reset, activate, checkUserExists } from '../services/auth'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import config from '../config'



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
    change(state, action) {
      return {
        ...state, ...action.payload
      };
    },
    checkEmail(state, action) {
      return {
        ...state, ...{
          checkEmail: 'validating',
        }
      };
    },
    checkUsername(state, action) {
      return {
        ...state, ...{
          checkUsername: 'validating',
        }
      };
    },
    activate(state, action) {
      return {
        ...state, ...{
          activateState: true,
        }
      };
    },
    check(state, action) {
      return {
        ...state, ...action.payload
      };
    },
    register(state, action) {
      return {
        ...state, ...{
          isRegisterSubmit: true,
        }
      };
    },
    registerSuccess(state, action) {
      return {
        ...state, ...{
          isRegisterSubmit: false,
        }
      };
    },
    registerFail(state, action) {
      return {
        ...state, ...{
          isRegisterSubmit: false,
        }
      };
    },
    login(state, action) {
      return {
        ...state, ...{
          isLoginSubmit: true,
        }
      };
    },
    loginSuccess(state, action) {
      return {
        ...state, ...action.payload, ...{
          isLoginSubmit: false,
        }
      };
    },
    loginFail(state, action) {
      return {
        ...state, ...{
          isLoginSubmit: false,
        }
      };
    },
    forgot(state, action) {
      return {
        ...state, ...{
          isForgotSubmit: true,
        }
      };
    },
    forgotSuccess(state, action) {
      return {
        ...state, ...{
          isForgotSubmit: false,
        }
      };
    },
    forgotFail(state, action) {
      return {
        ...state, ...{
          isForgotSubmit: false,
        }
      };
    },
    reset(state, action) {
      return {
        ...state, ...{
          isResetSubmit: true,
        }
      };
    },
    resetSuccess(state, action) {
      return {
        ...state, ...{
          isResetSubmit: false,
        }
      };
    },
    resetFail(state, action) {
      return {
        ...state, ...{
          isResetSubmit: false,
        }
      };
    },
  },
  effects: {
    *activate({ payload }, { call, put, select }) {
      const { messages } = yield select(state => state.common);
      try {
        const { data } = yield call(activate, payload);
        if (data) {
          message.success(messages['Your-account-has-been-successfully-activated!'], 5);
        }
      } catch (error) {
        message.error(error.message);
      }
    },
    *checkEmail({ payload }, { call, put }) {

      if (!payload.email) {
        yield put({ type: 'check', payload: { checkEmail: 'error' } });
        return;
      }

      try {
        const { data } = yield call(checkUserExists, { email: payload.email });
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
        const { data } = yield call(checkUserExists, { username: payload.username });
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
        message.error(messages[error.message]);
      }
    },
    *forgot({ payload }, { call, put, select }) {
      const { messages } = yield select(state => state.common);
      try {
        const { data } = yield call(forgot, payload);
        if (data) {
          yield put({ type: 'forgotSuccess' });
          message.info(messages['A-password-reset-email-has-been-sent-to-you.'], 5);
        }
      } catch (error) {
        yield put({ type: 'forgotFail' });
        message.error(messages[error.message], 3);
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
          message.info(messages['Your-account-has-been-created.'], 5);
          yield put(routerRedux.replace('/verify'));
        }
      } catch (error) {
        yield put({ type: 'registerFail' });
        message.error(messages[error.message], 3);
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
        message.error(messages[error.message], 3);
      }
    },
  },
  subscriptions: {
  }
};
