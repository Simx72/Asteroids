import Scene from '../../scenes/templates/asteroids-scene';

export default class Asteroides extends Phaser.GameObjects.Group {
  constructor(scene: Scene) {
    super(scene, [], {
      classType: Phaser.GameObjects.Image,
      defaultKey: 'asteroide.1',
      setScale: { x: 0.12, y: 0.12 },
      randomKey: true,
      setOrigin: { x: 0.5, y: 0.5 }
    });

    this.setName('grupo.ast')
  
  }

  children!: Phaser.Structs.Set<Phaser.Physics.Arcade.Image>;
}