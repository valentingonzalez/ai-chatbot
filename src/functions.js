const originalFetchFn = window.fetch;
import config from '@/api-services/_config';

window.fetch = (input, init = {}) => {
  init.headers = init.headers || {};
  if(typeof input === 'string') {
    if(config.sessionValue) {
      init.headers['X-Auth-Token'] = config.sessionValue;
    }
  }
  if(init) {
    init.method = init.method || 'POST';
    if(init.form) {
      init.body = config.makeFormData(init.form);
      delete init.form;
    } else if(init.json) {
      init.body = JSON.stringify(init.json);
      delete init.json;
    }
  }
  return originalFetchFn(input, init);
};

// VIEWPORT HACK
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
window.dispatchEvent(new Event('resize'));
  
