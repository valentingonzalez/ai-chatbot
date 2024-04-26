import config from '@/api-services/_config';

export default {
  getModel(data) {
    return fetch(`${config.url}/model:index/get-model-by-id`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  getEngines() {
    return fetch(`${config.url}/model:index/get-model-engines`, { method: 'POST'}).then(res => res.json());
  },
  add(data) {
    return fetch(`${config.url}/model:index/add-model`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  delete(data) {
    return fetch(`${config.url}/model:index/delete-model`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  undelete(data) {
    return fetch(`${config.url}/model:index/undelete-model`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  updateModel(data) {
    return fetch(`${config.url}/model:index/update-model`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  getFormData() {
    return fetch(`${config.url}/model:index/get-form-data`, { method: 'GET' }).then(res => res.json());
  },
  getModelDetail(data) {
    return fetch(`${config.url}/model:index/get-model-detail`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  updateRandomness(data) {
    return fetch(`${config.url}/model:index/update-temperature`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  updateChatHistory(data) {
    return fetch(`${config.url}/model:index/update-chat-history`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  updateScope(data) {
    return fetch(`${config.url}/model:index/toggle-out-of-scope`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  getSettings(data) {
    return fetch(`${config.url}/model:index/get-settings`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  getModelByRoomId(data) {
    return fetch(`${config.url}/model:index/get-model-by-room-id`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  updateScopePrompt(data) {
    return fetch(`${config.url}/model:index/update-scope-prompt`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  //returns room_id
  addAssistant(data) {
    return fetch(`${config.url}/model:index/add-model2`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  getAssistants(data) {
    return fetch(`${config.url}/model:index/get-models2`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  }
};
