import Scene from '../../scenes/templates/asteroids-scene';
import asset_htmlpausa from "./menu-pausa.html";
import styles from "./styles.module.css";

const pausaCacheKey = crypto.getRandomValues(new Uint32Array(10)).join("")

export class Pausa extends Phaser.GameObjects.DOMElement {
  static preload(scene: Scene) {
    // scene.load.html(pausaCacheKey, asset_htmlpausa);
    // console.log(pausaCacheKey, asset_htmlpausa)
  }

  constructor (scene: Scene) {
    super(scene, 0, 0, "div");

    this.createFromHTML(asset_htmlpausa)

    this.setClassName(styles["menu-pausa"])


  }

  node!: HTMLDivElement;

}