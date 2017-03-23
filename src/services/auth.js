import request from '../utils/request';
import config from '../config'

export async function login(params) {
  return request(`/sign_in.php`, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export async function forgot(params) {
  return request(`/forgot_password.php`, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export async function register(params) {
  return request(`/sign_up.php`, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export async function reset(params) {
  return request(`/reset_password.php`, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}



