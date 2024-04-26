import config from '@/api-services/_config';

export default {
  getAllRooms() {
    return fetch(`${config.url}/chat:index/get-all-rooms`, { method: 'GET'}).then(res => res.json());
  },
  newChat(data = {}) {
    return fetch(`${config.url}/chat:index/new-chat`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  searchRooms(data) {
    return fetch(`${config.url}/chat:index/search-rooms`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  saveModel(data) {
    return fetch(`${config.url}/chat:index/save-model`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  addFeedback(data) {
    return fetch(`${config.url}/chat:index/add-feedback`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  delete(data) {
    return fetch(`${config.url}/chat:index/delete-message`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  getMonthlyTokens() {
    return fetch(`${config.url}/chat:index/get-monthly-tokens`, { method: 'GET'}).then(res => res.json());
  }
  
};
