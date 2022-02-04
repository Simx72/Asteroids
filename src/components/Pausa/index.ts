import Scene from '../../scenes/templates/asteroids-scene';
import asset_htmlpausa from "../../html/menu-pausa.html";

export class Pausa extends Phaser.GameObjects.DOMElement {
  static preload(scene: Scene) {
    scene.load.html(asset_htmlpausa, asset_htmlpausa);
  }

  constructor (scene: Scene) {
    super(scene);

    this.createFromCache(asset_htmlpausa)

  }

}