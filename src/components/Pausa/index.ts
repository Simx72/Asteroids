import Scene from '../../scenes/default';
import animateCSS from '../animateCSS';
import asset_htmlpausa from "./menu-pausa.html";
import styles from "./styles.module.css";

let running: boolean = false;

class Pausa extends Phaser.GameObjects.DOMElement {
  constructor(scene: Scene) {
    super(scene, 0, 0, "div");

    scene.add.existing(this)

    this.createFromHTML(asset_htmlpausa)
      .setClassName(styles["menu-pausa"])
      .setOrigin(0.5)
      .setPosition(scene.center.x, scene.center.y)
      .syncResume()

  }

  menuAnimationDuration = 200;

  get running() { return running; };

  syncPause(): this {
    this.pause();
    return this;
  }
  syncResume(): this {
    this.resume();
    return this;
  }

  setVisible(value: boolean): this {
    if (value)
      this.setClassName(styles["menu-pausa"])
    else
      this.setClassName(styles["menu-pausa"] + ' ' + styles.hide)
    return this;
  }

  async pause() {
    running = false;
    this.setVisible(true);
    await animateCSS(this.node, 'fadeIn', this.menuAnimationDuration)
    this.emit(Pausa.Events.PAUSE)
    return this;
  }

  async resume() {
    running = true;
    await animateCSS(this.node, 'fadeOut', this.menuAnimationDuration);
    this.setVisible(false);
    this.emit(Pausa.Events.RESUME);
    return this;
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