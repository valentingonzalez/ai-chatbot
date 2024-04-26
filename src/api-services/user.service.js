import config from '@/api-services/_config';

export default {
  getUserInfo() {
    return fetch(`${config.url}/member:auth/get-user-info`, { method: 'GET' }).then(res => res.json());
  },
  updateUserInfo(data) {
    return fetch(`${config.url}/member:auth/update-user-info`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  updatePassword(data) {
    return fetch(`${config.url}/member:auth/update-password`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  getIp() {
    return fetch(`${config.url}/member:auth/get-ip`, { method: 'GET'}).then(res => res.json());
  },
};
