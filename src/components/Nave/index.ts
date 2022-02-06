import Scene from '../../scenes/templates/asteroids-scene';
import Disparos from './disparos';

export default class Nave extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Scene) {
    super(scene, 0, 0, 'nave');

    this
      .setPosition(scene.center.x, scene.center.y)
      .setName('nave')
      .setScale(0.06)
      .setOrigin(0.5, 0.5)
      .setDepth(10)

  }

  type = 'Nave';
  disparos = new Disparos(this, 'fueguito.22');
  body : Phaser.Physics.Arcade.Body = new Phaser.Physics.Arcade.Body(this.scene.physics.world, this);

  disparo = () => this.disparos.disparo()

  scene!: Scene;

}