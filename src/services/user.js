import request from '../utils/request';
import config from '../config'

export async function updateProfile(params) {
  return request(`/user/profiles`, {
    method: 'PATCH',
    body: JSON.stringify(params)
  })
}

export async function updateAccount(params) {
  return request(`/user/account`, {
    method: 'PATCH',
    body: JSON.stringify(params)
  })
}

