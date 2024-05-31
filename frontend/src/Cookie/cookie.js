// Function to set a JWT token in a cookie
function setCookie(tokenName, tokenValue, hours) {
  const expires = new Date();
  expires.setTime(expires.getTime() + hours * 60 * 60 * 1000);
  document.cookie = `${tokenName}=${tokenValue};expires=${expires.toUTCString()};path=/`;
}
// Function to get a cookie value by name
function getCookie(tokenName) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === tokenName) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}
// Function to remove a cookie by name
function removeCookie(tokenName) {
  document.cookie = `${tokenName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}
export { setCookie, getCookie, removeCookie };
