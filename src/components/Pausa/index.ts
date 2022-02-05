import Scene from '../../scenes/templates/asteroids-scene';
import asset_htmlpausa from "./menu-pausa.html";
import styles from "./styles.module.css";

export class Pausa extends Phaser.GameObjects.DOMElement {
  static preload(scene: Scene) {
    scene.load.html(asset_htmlpausa, asset_htmlpausa);
  }

  constructor (scene: Scene) {
    super(scene);

    this.createFromCache(asset_htmlpausa)

    this.setClassName(styles["menu-pausa"])

  }

}