import request from '../utils/request';

export async function updateProfile(params) {
  return request('/user/profiles', {
    method: 'PATCH',
    body: JSON.stringify(params),
    headers: {
      Authorization: `Bearer ${params.token}`,
      'content-type': 'application/json',
    },
  });
}

export async function updateAccount(params) {
  return request('/user/account', {
    method: 'PATCH',
    body: JSON.stringify(params),
    headers: {
      Authorization: `Bearer ${params.token}`,
      'content-type': 'application/json',
    },
  });
}
