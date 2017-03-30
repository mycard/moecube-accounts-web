import { login, forgot, register, reset, activate, checkUserExists } from '../services/auth'
import { message } from 'antd'


export default {
  namespace: 'auth',
  state: {
    activateState: false,
    checkEmail: '',
    checkUsername: '',
    isEmailExists: false,
    isUserNameExists: false,
    isRegisterSubmit: false,
    isLoginSubmit: false,
    isForgotSubmit: false,
    isSpinSubmit: false,
    register: {}
  },
  reducers: {
    change(state, action) {
      return {
        ...state, ...action.payload
      }
    },
    checkEmail(state, action) {
      return {
        ...state, ...{
          checkEmail: 'validating'
        }
      }
    },
    checkUsername(state, action) {
      return {
        ...state, ...{
          checkUsername: 'validating'
        }
      }
    },
    activate(state, action) {
      return {
        ...state, ...{
          activateState: true
        }
      }
    },
    check(state, action) {
      return {
        ...state, ...action.payload
      }
    },
    register(state, action) {
      return {
        ...state, ...{
          isRegisterSubmit: true
        }
      }
    },
    registerSuccess(state, action) {
      return {
        ...state, ...{
          isRegisterSubmit: false
        }
      }
    },
    registerFail(state, action) {
      return {
        ...state, ...{
          isRegisterSubmit: false
        }
      }
    },
    login(state, action) {
      return {
        ...state, ...{
          isLoginSubmit: true
        }
      }
    },
    loginSuccess(state, action) {
      return {
        ...state, ...{
          isLoginSubmit: false
        }
      }
    },
    loginFail(state, action) {
      return {
        ...state, ...{
          isLoginSubmit: false
        }
      }
    },
    forgot(state, action) {
      return {
        ...state, ...{
          isForgotSubmit: true
        }
      }
    },
    forgotSuccess(state, action) {
      return {
        ...state, ...{
          isForgotSubmit: false
        }
      }
    },
    forgotFail(state, action) {
      return {
        ...state, ...{
          isForgotSubmit: false
        }
      }
    },
    reset(state, action) {
      return {
        ...state, ...{
          isResetSubmit: true
        }
      }
    },
    resetSuccess(state, action) {
      return {
        ...state, ...{
          isResetSubmit: false
        }
      }
    },
    resetFail(state, action) {
      return {
        ...state, ...{
          isResetSubmit: false
        }
      }
    },
  },
  effects: {
    *activate({ payload }, { call, put }) {
      const { data } = yield call(activate, payload)
    },
    *checkEmail({ payload }, { call, put }) {
      const { data } = yield call(checkUserExists, payload)

      if(data) {
        yield put({ type: 'check', payload: { isEmailExists: true , checkEmail: 'warning'}})
      } else {
        yield put({ type: 'check', payload: { isEmailExists: false , checkEmail: 'success'}})
      }
    },
    *checkUsername({ payload }, { call, put }) {
      const { data } = yield call(checkUserExists, payload)

      if(data) {
        yield put({ type: 'check', payload: { isUserNameExists: true , checkUsername: 'warning'}})
      } else {
        yield put({ type: 'check', payload: { isUserNameExists: false , checkUsername: 'success'}})
      }
    },
    *login({ payload }, { call, put }) {
        const {data} = yield call(login, payload)
        
        if(data){
          yield put({ type: 'loginSuccess' })   
          yield put({ type: 'user/loginSuccess', payload: { data } })
          message.info("登录成功")
        } else {
          yield put({ type: 'loginFail' })
          message.error("登陆失败")
        }
    },
    *forgot({ payload }, { call, put }) {
        const { data } = yield call(forgot, payload)
      
        if(data){
          yield put({ type: 'forgotSuccess' })
          message.info("已发送密码重置邮件")
        }else {
          yield put({ type: 'forgotFail' })
          message.error("密码重置邮件发送失败")      
        }
    },
    *register({ payload }, { call, put }) {
        const {data} = yield call(register, payload)

        if(data) {
          yield put({ type: 'registerSuccess'})
          message.info("注册成功")
        } else {
          yield put({ type: 'registerFail' })
          message.error("注册失败")
        }
    },
    *reset({ payload }, { call, put }) {
        const { data } = yield call(reset, payload)
      
        if(data){
          yield put({ type: 'resetSuccess' })
          message.info("重置成功")
        }else{
          yield put({ type: 'resetFail' })
          message.error("重置失败")          
        }
    },
  },
  subscriptions: {},
};
