/* Based in w3 schoools */
export namespace cookies {
  /* function set(key: string, value: string, exdays: number = 30) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
  }
  function getCookies() {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    return ca;
  }
  function findCookieVal(key: string) {
    let name = key + "=";
    let ca = getCookies()
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function get(key: string) {
    let val = findCookieVal(key)
    if (val.match(/^[\{\[]/gm))
      try {
        return JSON.parse(val)
      } catch (e) { "not a json" }
    
    if (val.match(/[\d\.]/gm))
      try {
        return JSON.parse(val)
      } catch (e) { "not a json" }
    
    return val;
  } */

  function set(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

}