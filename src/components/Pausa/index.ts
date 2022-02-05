import Scene from '../../scenes/templates/asteroids-scene';
import asset_htmlpausa from "./menu-pausa.html";
import styles from "./styles.module.css";

export default class Pausa extends Phaser.GameObjects.DOMElement {
  constructor (scene: Scene) {
    super(scene, 0, 0, "div");

    this.createFromHTML(asset_htmlpausa)

    this.setClassName(styles["menu-pausa"])


  }

  node!: HTMLDivElement;

}