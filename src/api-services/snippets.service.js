import config from '@/api-services/_config';

export default {
  getSnippets(data) {
    return fetch(`${config.url}/snippet:index/get-snippets`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  addSnippet(data) {
    return fetch(`${config.url}/snippet:index/add-snippet`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  edit(data) {
    return fetch(`${config.url}/snippet:index/edit-snippet`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  delete(data) {
    return fetch(`${config.url}/snippet:index/delete-snippet`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  search(data) {
    return fetch(`${config.url}/snippet:index/search-snippets`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  createFolder(data) {
    return fetch(`${config.url}/snippet:folders/create-folder`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  addSnippetToFolder(data) {
    return fetch(`${config.url}/snippet:folders/add-snippet-to-folder`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  getSnippetsWithFolders(data) {
    return fetch(`${config.url}/snippet:folders/get-snippets-with-folders`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  getAllFolders(data){
    return fetch(`${config.url}/snippet:folders/get-all-folders`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  removeSnippetFromFolder(data){
    return fetch(`${config.url}/snippet:folders/remove-snippet-from-folder`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  deleteFolder(data){
    return fetch(`${config.url}/snippet:folders/delete-folder`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  changeFolderName(data){
    return fetch(`${config.url}/snippet:folders/change-folder-name`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  }
};
