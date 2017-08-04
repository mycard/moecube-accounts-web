import { message } from 'antd';
import { uploadImage } from '../services/upload';

// 这里这个 msg 参数原本名字为 message，跟顶上 import 的重了，我把它改名为 msg
// 下面 message.error 语法上似乎应该是指原本第一个参数 message
// 但是语义上应该是在调用 antd 的 message，我不知道之前为什么能跑，这里需要测试
// by zh99998

window.onerror = (msg, url, line, col, err) => {
  console.error(err);
  message.error(err.stack, 100);
};


export default {
  namespace: 'upload',
  state: {
    imageUrl: '',
    isUpload: false,
    uploadedImage: {},
  },
  reducers: {
    start(state) {
      return {
        ...state,
        ...{
          isUpload: true,
        },
      };
    },
    abort(state) {
      return {
        ...state,
        ...{
          isUpload: false,
        },
      };
    },
    getfile(state, action) {
      return {
        ...state, ...action.payload,
      };
    },
    uploadSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        ...{
          isUpload: false,
        },
      };
    },
  },
  effects: {
    * upload({ payload }, { call, put }) {
      try {
        const { data } = yield call(uploadImage, payload);

        if (data) {
          const [image] = data;
          yield put({ type: 'uploadSuccess', payload: { uploadedImage: image } });

          const { user_id } = payload;

          yield put({ type: 'user/updateProfile', payload: { avatar: image.Key, user_id } });
        }
      } catch (error) {
        yield put({ type: 'uploadFail' });
        message.error(error.message);
      }
    },
  },
  subscriptions: {},
};
