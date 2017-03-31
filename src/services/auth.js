import request from '../utils/request';

export async function login(params) {
  return request(`/signin`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function forgot(params) {
  return request(`/forgot`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function register(params) {
  return request(`/signup`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function reset(params) {
  return request(`/reset`, {
    method: 'PATCH',
    body: JSON.stringify(params),
  });
}

export async function activate(params) {
  return request(`/activate`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

// deprecated
export async function getUserByEmail(params) {
  return request(`/user/${params.email}`, {
    method: 'GET',
  });
}

// deprecated
export async function getUserByUsername(params) {
  return request(`/user/${params.username}`, {
    method: 'GET',
  });
}

export async function checkUserExists(params) {
  return request(`/user/exists`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

