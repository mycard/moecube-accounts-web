import crypto from 'crypto';
import 'url-api-polyfill';

let sso;
const ssoString = new URL(window.location).searchParams.get('sso');

if (ssoString) {
  sso = new URLSearchParams(Buffer.from(ssoString, 'base64').toString());
}


export const handleSSO = (user) => {
  if (sso) {
    const params = new URLSearchParams();
    const url = new URL(sso.get('return_sso_url'));

    for (const [key, value] of Object.entries(user)) {
      params.set(key, value);
    }
    params.set('return_sso_url', sso.get('return_sso_url'));
    if (sso.get('nonce')) {
      params.set('nonce', sso.get('nonce'));
    }
    params.set('external_id', user.id);
    params.set('avatar_url', user.avatar);
    const payload = Buffer.from(params.toString()).toString('base64');    
    
    url.searchParams.set('sso', payload);
    url.searchParams.set('sig', crypto.createHmac('sha256', 'zsZv6LXHDwwtUAGa').update(payload).digest('hex'));

    window.location.href = url;
    return true;
  } else {
    return false;
  }
};
