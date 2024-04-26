import config from '@/api-services/_config';

export default {
  getRandomButton() {
    return fetch(`${config.url}/deploy:chatbot/get-random-button`, { method: 'GET'}).then(res => res.json());
  },
  checkButton(data) {
    return fetch(`${config.url}/deploy:chatbot/check-button`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  clickedButton(data) {
    return fetch(`${config.url}/deploy:chatbot/clicked-button`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  pingInteraction(data) {
    return fetch(`${config.url}/deploy:chatbot/ping-interaction`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
};
