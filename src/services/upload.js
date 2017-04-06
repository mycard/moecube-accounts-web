import request from '../utils/request';

export async function uploadImage(params) {

  console.log(params);

  let data = new FormData();
  data.append('file', params['image']);

  return request('/upload/image', {
    method: 'POST',
    body: data,
    headers: {},
  });
}

