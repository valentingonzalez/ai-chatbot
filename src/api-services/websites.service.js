import config from '@/api-services/_config';

export default {
  getWebsitePreview(data, signal) {
    return fetch(`${config.url}/file:website/website-preview`, { method: 'POST', body: config.makeFormData(data), signal }).then(res => res.json());
  },
  submitWebsite(data) {
    return fetch(`${config.url}/file:website/submit-website`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  submitLinks(data) {
    return fetch(`${config.url}/file:website/submit-links`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  checkWebsiteStatus(data) {
    return fetch(`${config.url}/file:website/check-website-status`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  }
};
