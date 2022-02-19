/* Based in w3 schoools */
namespace cookies {
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

  export function set(key: string, value: string, exdays: number = 30) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = key + "=" + value + ";" + expires + ";path=/";
    return cookies;
  }

  export function get(key: string) {
    var name = key + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  export function getNum(key: string, int: boolean = false) {
    if (int) {
      return parseInt(get(key))
    } else {
      return parseFloat(get(key))
    }
  }

  export async function check(key: string) {
    var cookie = get(key);
    if (cookie != "") {
      return cookie;
    } else {
      throw new Error("Cookie is not defined")
    }
  }


  export function remove(key: string) {
    set(key, '', 0.00001)
    return cookies
  }

  export function init(key: string, defaultValue: string) {
    cookies.check(key)
      .catch(() => cookies.set(key, defaultValue))
  }

}

cookies.init('config-volumen-musica', '100')
cookies.init('config-volumen-fx', '100')
cookies.init('test', "Un valor de prueba 🧐")

export default cookies;