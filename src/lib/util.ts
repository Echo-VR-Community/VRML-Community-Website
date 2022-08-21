export function setCookie(key: string, value: string, expiresDays = 1000) {
  const d = new Date();
  d.setTime(d.getTime() + (expiresDays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${key}=${value};${expires};path=/;samesite=Strict;`;
}

export function getCookie(key: string, defaultValue = "") {
  const name = key + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return defaultValue;
}