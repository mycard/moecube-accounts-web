import { routerRedux } from 'dva/router'
import { updateProfile, updateAccount } from '../services/user'
import { message } from 'antd'


export default {
  namespace: 'user',
  state: {
    data: {},
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
        ...state, ...action.payload
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
  },
  effects: {
    *loginSuccess({ payload }, { call, put }) {

      localStorage.setItem("user", JSON.stringify(payload.data))

      yield put(routerRedux.replace("/profiles"))
    },
    *preLogin({ payload }, { call, put }) {
      let user = localStorage.getItem("user")

      if(!user){
        yield put(routerRedux.replace("/login"))       
      }

      yield put({type: 'loginFromStorage', payload: { data: JSON.parse(user) }})
    },
    *updateProfile({ payload }, { call, put }) {

      let { data } = yield call(updateProfile, payload )
      
      if(data){
          yield put({ type: 'updateProfileSuccess', payload: { data } })
          
          message.info("更新成功")
        }else {
          yield put({ type: 'updateProfileFail' })
          message.error("更新失败")      
        }
    },
    *updateAccount({ payload }, { call, put }) {
      try {
        
        let { data } = yield call(updateAccount, payload )   

        if(data){
          yield put({ type: 'updateAccountSuccess', payload: { data } })
          message.info("更新成功")
        }     
      } catch (error) {
          yield put({ type: 'updateAccountFail' })
          message.error(error.message)
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query}) => {
        if(pathname == '/profiles') {

          dispatch({ type: 'preLogin', payload: query})
          
        }
      })
    }
  },
};
