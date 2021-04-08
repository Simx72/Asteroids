export default class AsteroidsScene extends Phaser.Scene {
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);
    this.centerX = 0;
    this.centerY = 0;
    this._ = { objeto: {}, dato: {} };
    this.defaultFont = 'ChakraPetch, Verdana, Geneva, Tahoma, sans-serif';
    this.dato('assets url', '/asteroids-assets');
    {
      let xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200)
        this.dato('assets url', 'https://pagina-simx72-aba9b.web.app/asteroids-assets/')
      }
      xhr.open('GET', 'https://pagina-simx72-aba9b.web.app/')
      xhr.send()
    }
  }

  defaultFont: string;
  centerX: number;
  centerY: number;

  /**
   * No usar
   * @deprecated
   */
  _: {
    objeto: { [c: string]: any },
    dato: { [c: string]: any }
  };

  /**
   * puede pasarse `key` y `object` para guardar un 
   * objeto phaser(@type { Phaser.GameObjects.GameObject }) 
   * o una clase child de este, luego solo pasas `key` para
   * volver a traer el objeto
   * @param key - valor unico del objeto
   * @param gameObject - objeto
   */
  objeto<T extends (Phaser.GameObjects.GameObject | Phaser.GameObjects.Group)>(key: string, gameObject?: T): T {
    if (typeof gameObject != 'undefined') {
      this._.objeto[key] = gameObject
      return gameObject
    } else {
      return <T>this._.objeto[key];
    }
  }

  /**
   * puede pasarse `key` y `val` para guardar un 
   * dato (@type { string | number | boolean })
   * luego solo pasas `key` para volver a traer 
   * el objeto
   * @param key - valor unico del dato
   * @param val - dato
   */
  dato<T = string | number | boolean>(key: string, val?: T) {
    if (typeof val != 'undefined') {
      this._.dato[key] = val
      return val
    } else {
      return <T>this._.dato[key];
    }
  }

  defaultPreload() {
    this.load.setBaseURL(this.dato<string>('assets url'))
    this.load.setCORS('anonymous')
    this.centerX = this.scale.width / 2
    this.centerY = this.scale.height / 2
  }
}