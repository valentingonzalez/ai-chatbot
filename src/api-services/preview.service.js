import config from "@/api-services/_config";

export default {
  savePreview(data) {
    return fetch(`${config.url}/previews:index/save-preview`, {method: 'POST', body: config.makeFormData(data) }).then((res) => res.json());
  },
  saveAndEditPreview(data) {
    //preview, id
    return fetch(`${config.url}/previews:index/save-and-edit-preview`, {method: 'POST', body: config.makeFormData(data) }).then((res) => res.json());
  },
  getPreviews() {
    return fetch(`${config.url}/previews:index/get-preview-list`, { method: 'GET' }).then(res => res.json());
  },
  getPreview(id) {
    return fetch(`${config.url}/previews:index/get-preview-by-id`, { method: 'POST', body: config.makeFormData({id: id}) }).then(res => res.json());
  },
  disable(id) {
    return fetch(`${config.url}/previews:index/disable-preview`, { method: 'POST', body: config.makeFormData({id: id}) }).then(res => res.json());
  },
  enable(id) {
    return fetch(`${config.url}/previews:index/enable-preview`, { method: 'POST', body: config.makeFormData({id: id}) }).then(res => res.json());
  },
};
