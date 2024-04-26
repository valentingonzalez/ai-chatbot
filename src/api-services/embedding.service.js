import config from '@/api-services/_config';

export default {
    getEmbeddings(data) {
        return fetch(`${config.url}/embedding:index/get-embeddings`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
    },
    updateEmbedding(data) {
        return fetch(`${config.url}/embedding:index/edit-embedding`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
    },
    deleteEmbedding(data) {
        return fetch(`${config.url}/embedding:index/delete-embedding`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
    },
    getEmbeddingsForEvent(data) {
        return fetch(`${config.url}/embedding:index/get-embeddings-of-event`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
    },
    getEmbeddingsCountForEvent(data) {
        return fetch(`${config.url}/embedding:index/get-embeddings-count-of-event`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
    },
    addEmbedding(data) {
        return fetch(`${config.url}/embedding:index/add-embedding`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
    },
    regenerate(data) {
        return fetch(`${config.url}/embedding:regenerate/index`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
    },
    enableDisableWebsiteEmbedding(data){
        return fetch(`${config.url}/embedding:index/enable-disable-website-embedding`, { method: 'POST', body: config.makeFormData(data) }).then(res => res.json());
    }
};