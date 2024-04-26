import AuthService from './auth.service';
let url = process.env.VUE_APP_API_URL || 'https://api.ezai.io';
let urlAuth = process.env.VUE_APP_AUTH_URL || 'https://auth.ezai.io';
let urlAuthAPI = process.env.VUE_APP_AUTHAPI_URL || 'https://authapi.ezai.io';

// remove the .ezai.io version of this cookie as it's overriding the chat.ezai.io version and
// breaking the page on refresh for some people (like steven/lawrence). might have been legacy
// code because it doesn't get set anywhere else. can probably remove this later.
document.cookie = "ezai_auth_session_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.ezai.io";

const urlParams = new URLSearchParams(window.location.search);
let sessionValue = getCookie("ezai_auth_session_cookie");
let memberId;
let memberName;
let memberEmail;
let memberInitials;

let isDeployedApp = false;
let deployKey = getHostKey();
let deploymentObject = null;
if(process.env.NODE_ENV === 'development'){
 // deployKey = "douglaswade";
 // isDeployedApp = true;
}


if(deployKey) {
  // use custom api url as well
  url = `https://${deployKey}.api.ezai.io`;
  isDeployedApp = true;
}


document.cookie = "ezai_deploy=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

let setDeploymentObject = (deploy) => {
  deploymentObject = deploy;
}

const token = urlParams.get('token');
if(token) {
  // Set the cookie with a 1-day expiration
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 365);
  document.cookie = `ezai_auth_session_cookie=${token}; expires=${expirationDate.toUTCString()}; path=/`;
  // Remove the token parameter from the URL and update the URL
  sessionValue = token;
  const urlParams2 = new URL(window.location.href);
  urlParams2.searchParams.delete('token');
  window.history.replaceState({}, '', urlParams2.toString());
}

let checkSession = async() => {
  if(memberId) return memberId;
  const response = await AuthService.checkSession();
  if(response.member){
    memberId = response.member_id
    if(response.member && response.member.user_name){
      memberName = response.member.user_name;
      memberEmail = response.member.email;
      memberInitials = response.member.initials;
    }
  }
  return memberId;
}


function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for(let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if(cookie[0] === name) {
      return cookie[1];
    }
  }
  return null;
}

/**
 * Extract key from hostname: KEY.app.ezai.io
 * Or for testing, from URL param: ?debug_host=KEY
 *
 * return {String}
 */
function getHostKey() {
  const debugHost = urlParams.get('debug_host');
  if(debugHost) {
    return debugHost;
  }

  const match = window.location.hostname.match(/^([a-z0-9-]+)\.app\.ezai\.io$/);
  return match ? match[1] : '';
}

const makeFormData = obj => {
  const fd = new FormData();
  Object.entries(obj).forEach(([k, v]) => {
    if(k.endsWith('[]') && Array.isArray(v)) {
      v.forEach(value => fd.append(k, String(value)));
    } else {
      fd.append(k, String(v));
    }
  });
  return fd;
};

function getMember() {
  return {memberName, memberEmail, memberInitials}
}

export default { url, urlAuth, urlAuthAPI, makeFormData, sessionValue, checkSession, deployKey,
  isDeployedApp, setDeploymentObject, deploymentObject, memberId, getMember};
