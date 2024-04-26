import config from '@/api-services/_config';

export default {
  getCheckoutSession(data) {
    return fetch(`${config.url}/pricing:billings/create-checkout-session`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  getAlreadyContacted() {
    return fetch(`${config.url}/pricing:contact/already-contacted`, { method: 'GET'}).then(res => res.json());
  },
  sendContactForm(data) {
    return fetch(`${config.url}/pricing:contact/contact-seller`, { method: 'POST', body: config.makeFormData(data)}).then(res => res.json());
  },
  getCurrentPlan() {
    return fetch(`${config.url}/pricing:billings/current-plan`, { method: 'GET'}).then(res => res.json());
  },
  getInvoices() {
    return fetch(`${config.url}/pricing:billings/get-invoices`, { method: 'GET'}).then(res => res.json());
  },
};
