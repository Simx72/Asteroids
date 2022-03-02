import Scene from '../../scenes/templates/default';
import asset_htmlpausa from "./menu-pausa.html";
import styles from "./styles.module.css";

export let running: boolean = false;

class Pausa extends Phaser.GameObjects.DOMElement {
  constructor(scene: Scene) {
    super(scene, 0, 0, "div");

    scene.add.existing(this)

    this.createFromHTML(asset_htmlpausa)
      .setClassName(styles["menu-pausa"])
      .setOrigin(0.5)
      .setPosition(scene.center.x, scene.center.y)

    running = true;


  }

  pause() {
    this.node.style.display = "flex!important";
    running = false;
    this.emit(Pausa.Events.PAUSE)
  }
  
  resume() {
    this.node.style.display = "none";
    running = true;
    this.emit(Pausa.Events.RESUME)
  }

  node!: HTMLDivElement;

}

namespace Pausa {
  export namespace Events {
    export const RESUME = "resumegame";
    export const PAUSE = "pausegame";
  }
}

export default Pausa;