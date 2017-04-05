import { routerRedux } from 'dva/router'
import { updateProfile, updateAccount } from '../services/user'
import { getAuthUser } from '../services/auth'
import { message } from 'antd'



export default {
  namespace: 'user',
  state: {
    token: "",
    user: {},
    isUpdateSubmit: false
  },
  reducers: {
    loginFromStorage(state, action) {
      return {
        ...state, ...action.payload
      }
    },
    loginSuccess(state, action) {
      return {
        ...state, ...action.payload.data
      }
    },
    updateProfile(state, action) {
      return {
        ...state, ...{
          isUpdateSubmit: true
        }
      }
    },
    updateProfileSuccess(state, action) {
      return {
        ...state, ...action.payload, ...{
          isUpdateSubmit: false
        }
      }
    },
    updateProfileFail(state, action) {
      return {
        ...state, ...{
          isUpdateSubmit: false
        }
      }
    },
    updateAccount(state, action) {
      return {
        ...state, ...{
          isUpdateSubmit: true
        }
      }
    },
    updateAccountSuccess(state, action) {
      return {
        ...state, ...action.payload, ...{
          isUpdateSubmit: false
        }
      }
    },
    updateAccountFail(state, action) {
      return {
        ...state, ...{
          isUpdateSubmit: false
        }
      }
    },
    storeToken(state, action) {
      return {
        ...state, ...action.payload
      }
    },
    preLoginSuccess(state, action) {
      return {
        ...state, ...action.payload
      }
    }
  },
  effects: {
    *loginSuccess({ payload }, { call, put }) {

      const { data: {user, token} } = payload

      if(!payload.data) {
        message.error("error ")
      }
      if(token) {
        yield put({ type: 'storeToken', payload: { token }})
        localStorage.setItem("token", token)
      }

      if(user && user.active) {
        yield put(routerRedux.replace("/profiles"))
        // message.info("登录成功")
      } else {
        yield put(routerRedux.replace(`/verify`))
      }

    },
    *preLogin({ payload }, { call, put }) {
      let token = localStorage.getItem("token")

      try {
        let { data } =  yield call(getAuthUser, { token })
        if (data ) {
          yield put({ type: 'preLoginSuccess', payload: { user: data, token }})

          if(data.active) {
            // yield put(routerRedux.replace("/profiles"))
          }
        }
      } catch (error) {
        message.error(error.message)
      }
    },
    *updateProfile({ payload }, { call, put, select }) {
      message.destroy()
      try {
        let token = yield select(state => state.user.token)
        let { messages } = yield select(state => state.common)

        let { data } = yield call(updateProfile, {...payload, token})

        if (data) {
          yield put({ type: 'updateProfileSuccess', payload: { user: data, token } })

          message.info(messages["update_success"])
        }
      } catch (error) {
        yield put({ type: 'updateProfileFail' })
        message.error(error.message)
      }
    },
    *updateEmail({ payload }, { call, put, select }) {
      let { messages } = yield select(state => state.common)
      try {
        let token = yield select(state => state.user.token)
        let { data } = yield call(updateAccount, {...payload, token})

        if (data) {
          yield put({ type: 'updateAccountSuccess', payload: { user: data, token } })
          message.info(messages['A-verification-email-has-been-sent-to-you,please-check-the-mail-to-complete.'])
        }
      } catch (error) {
        yield put({ type: 'updateAccountFail' })
        message.error(messages[error.message])
      }
    },

    *updateAccount({ payload }, { call, put, select }) {
      let { messages } = yield select(state => state.common)
      try {
        let token = yield select(state => state.user.token)
        let { data } = yield call(updateAccount, {...payload, token})

        if (data) {
          yield put({ type: 'updateAccountSuccess', payload: { user: data, token } })
          message.info(messages["update_success"])
        }
      } catch (error) {
        yield put({ type: 'updateAccountFail' })
        message.error(messages[error.message])
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname == '/profiles') {

          dispatch({ type: 'preLogin', payload: query })
        }
      })
    }
  },
};
