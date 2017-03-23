import { login, forgot, register, reset } from '../services/auth'
import { message } from 'antd'


export default {
  namespace: 'auth',
  state: {
    isSubmit: false,
    register:{}
  },
  reducers: {
    change(state, action) {
      return {
        ...state, ...action.payload
      }
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
        const {data} = yield call(login, payload)
        
        if(data){
          yield put({ type: 'loginSuccess'})   
          message.info(data["message"])
        } else {
          yield put({ type: 'loginFail'})   
          message.error("登陆失败")
        }
    },
    *forgot({ payload }, { call, put }) {
        const { data } = yield call(forgot, payload)
      
        if(data)
        {
          yield put({ type: 'forgotSuccess'})
          message.info(data["message"])
        }else {
          yield put({ type: 'forgotFail' })
          message.error("邮件发送失败")      
        }
    },
    *register({ payload }, { call, put }) {
        const { data } = yield call(register, payload)

        if(data) {
          yield put({ type: 'change', payload: { register: data}})
        }
        // if(data){
        //   yield put({ type: 'registerSuccess' })
        //   message.info(data["message"])   
        // }
    },
    *reset({ payload }, { call, put }) {
        const { data } = yield call(reset, payload)
      
        if(data)
        {
          yield put({ type: 'resetSuccess' })
          message.info(data["message"])
        }else{
          yield put({ type: 'resetFail' })
          message.error("重置失败")          
        }
    },
  },
  subscriptions: {},
};
