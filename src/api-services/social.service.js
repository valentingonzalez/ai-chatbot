import config from '@/api-services/_config';
export default {
  getSocialAccounts(data) {
    return fetch(`${config.url}/member:socialaccounts/get-accounts-list`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  getSocialAccountPosts(data) {
    return fetch(`${config.url}/member:socialaccounts/fetch-posts`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  disconnectSocialAccount(data) {
    return fetch(`${config.url}/member:socialaccounts/disconnect-account`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  }
};
