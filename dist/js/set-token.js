const hash = window.location.hash.substring(1);
const { access_token } = querystring.parse(hash);
window.token = access_token;
