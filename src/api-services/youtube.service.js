import config from '@/api-services/_config';

export default {
  submitLink(data) {
    return fetch(`${config.url}/youtube:index/save-link`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  getLinks() {
    return fetch(`${config.url}/youtube:index/get-links`, { method: 'GET'}).then(res => res.json());
  },
  getThumbnailUrl(data) {
    return fetch(`${config.url}/youtube:index/get-thumbnail`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());

  }
};
