import config from "@/api-services/_config";

export default {
  checkSession() {
    return fetch(`${config.url}/member:auth/check-session`, { method: "POST", body: config.makeFormData({ session_id: config.sessionValue }), }).then((res) => res.json());
  },
  deleteMemberInformation() {
    return fetch(`${config.url}/member:auth/delete-information`, { method: "POST", body: {} }).then((res) => res.json());
  },
  logout() {
    return fetch(`${config.urlAuthAPI}/member:auth/logout`, { method: "POST", body: config.makeFormData({token: config.sessionValue})}).then((res) => res.json());
  },
};
