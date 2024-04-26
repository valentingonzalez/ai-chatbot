import config from '@/api-services/_config';

export default {
  createMember(email, name, deploy_key) {
    return fetch(`${config.url}/deploy:auth/create-member`, { method: 'POST', body: config.makeFormData({ email, name, deploy_key }), }).then((res) => res.json());
  },
  getDeployment(data) {
    return fetch(`${config.url}/deploy:auth/get-deployment`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  getAllDeployments() {
    return fetch(`${config.url}/deploy:index/get-all-deployments`, { method: 'GET'}).then(res => res.json());
  },
  createDeploy(data) {
    return fetch(`${config.url}/deploy:index/create-deploy`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  getDeployById(data) {
    return fetch(`${config.url}/deploy:index/get-deploy-by-id`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  getDeploymentsByModelId(data) {
    return fetch(`${config.url}/deploy:index/get-deployments-by-model-id`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  saveDeploy(data) {
    return fetch(`${config.url}/deploy:index/save-chatbot-deploy`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  saveDeployApi(data) {
    return fetch(`${config.url}/deploy:index/update-api-deploy`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  generateApiKey(data) {
    return fetch(`${config.url}/deploy:index/generate-api-key`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  deleteDeploy(data) {
    return fetch(`${config.url}/deploy:index/delete-deploy`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  },
  getDeploySnippets(data) {
    return fetch(`${config.url}/deploy:index/get-code-snippet`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
  }
};
