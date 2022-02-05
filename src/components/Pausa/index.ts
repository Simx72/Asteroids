import Scene from '../../scenes/templates/asteroids-scene';
import asset_htmlpausa from "./menu-pausa.html";
import styles from "./styles.module.css";

const pausaCacheKey = crypto.getRandomValues(new Uint32Array(10)).join("")

export class Pausa extends Phaser.GameObjects.DOMElement {
  static preload(scene: Scene) {
    scene.load.html(pausaCacheKey, asset_htmlpausa);
  }

  constructor (scene: Scene) {
    super(scene);

    this.createFromCache(pausaCacheKey)

    this.setClassName(styles["menu-pausa"])

    // console.log(pausaCacheKey)

  }

}