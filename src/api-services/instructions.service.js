import config from '@/api-services/_config';

export default {
  getInstructions(data) {
    return fetch(`${config.url}/model:instruction/get-instructions`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  add(data) {
    return fetch(`${config.url}/model:instruction/add-instruction`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  update(data) {
    return fetch(`${config.url}/model:instruction/edit-instruction`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  getTokenSize(data) {
    return fetch(`${config.url}/model:instruction/get-token-size`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  disable(data) {
    return fetch(`${config.url}/model:instruction/toggle-instruction`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  archive(data) {
    return fetch(`${config.url}/model:instruction/delete-instruction`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  copyFromModels(data) {
    return fetch(`${config.url}/model:instruction/copy-from-models`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
};
