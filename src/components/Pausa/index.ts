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
    this.emit(Pausa.Events.Music.Pause)
  }
  
  play() {
    this.node.style.display = "none";
    this.emit(Pausa.Events.Music.Play)
  }

  node!: HTMLDivElement;

}

namespace Pausa {
  export namespace Events {
    export namespace Music {
      export var Pause = 'musicpause';
      export var Play = 'musicplay';
    }
  }
}

export default Pausa;