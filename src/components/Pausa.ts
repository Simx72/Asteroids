import Scene from '../scenes/templates/asteroids-scene';
import asset_htmlpausa from "../html/menu-pausa.html";

export class Pausa extends Phaser.GameObjects.DOMElement {
  static preload(scene: Scene, key = "html_pausa") {
    scene.data.set("html-pausa-key", Math.floor(Math.random()*0xFFFFFFFF).toString(16))
    scene.load.html(scene.dato("html-pausa-key"), asset_htmlpausa);
  }

  constructor (scene: Scene) {
    super(scene);

    this.createFromCache(scene.dato("html-pausa-key"))

  }

}