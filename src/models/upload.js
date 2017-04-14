import { message } from 'antd';
import { uploadImage } from '../services/upload';
window.onerror = (message, url, line,col, err ) => {
  message.error(err.stack, 100)
}


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
    *upload({ payload }, { call, put }) {
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
