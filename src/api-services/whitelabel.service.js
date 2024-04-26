import config from "@/api-services/_config";

export default {
  approval(data) {
    return fetch(`${config.url}/whitelabel:index/send-approval`, { method: "POST", body: config.makeFormData(data) }).then((res) => res.json());
  },
  checklabel() {
    return fetch(`${config.url}/whitelabel:index/check-label`, { method: "GET" }).then((res) => res.json());
  }
};
