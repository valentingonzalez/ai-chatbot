import config from '@/api-services/_config';

export default {
  newWizard() {
    return fetch(`${config.url}/wizard:index/create-instance`, { method: 'POST' }).then(res => res.json());
  },
  getWizard() {
    return fetch(`${config.url}/wizard:index/get-last-instance?`, { method: 'GET' }).then(res => res.json());
  },
  saveUserType(data) { // { user_type: String, id: wizard_id )}
    return fetch(`${config.url}/wizard:index/save-user-type`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  saveModelName(data) { // { model_name: String, id: wizard_id )}
    return fetch(`${config.url}/wizard:index/save-model-name`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  saveWebsite(data) { // { website_url: String, id: wizard_id )}
    return fetch(`${config.url}/wizard:index/save-website-url`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  saveModelType(data) { // { model_type: String, id: wizard_id )}
    return fetch(`${config.url}/wizard:index/save-model-type`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  saveModel(data) { // { model_name: String, model_id: String, id: wizard_id )}
    return fetch(`${config.url}/wizard:index/save-model`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  completeWizard(data) { // { id: wizard_id )}
    return fetch(`${config.url}/wizard:index/application-complete`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
};
