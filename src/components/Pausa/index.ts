import Scene from '../../scenes/templates/default';
import asset_htmlpausa from "./menu-pausa.html";
import styles from "./styles.module.css";

class Pausa extends Phaser.GameObjects.DOMElement {
  constructor(scene: Scene) {
    super(scene, 0, 0, "div");

    this.createFromHTML(asset_htmlpausa)

    this.setClassName(styles["menu-pausa"])




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