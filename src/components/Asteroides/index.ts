import Scene from '../../scenes/templates/asteroids-scene';

type Child = Phaser.Physics.Arcade.Image;

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

  children!: Phaser.Structs.Set<Child>;

  create(x: number, y: number) {
    const newChild = <Child>super.create(x, y)

    let texture = ''

    switch (Phaser.Math.Between(1, 2)) {
      case 1: texture = 'asteroide.1'; break;
      case 2: texture = 'asteroide.2'; break;
      case 3: texture = 'asteroide.3'; break;
    }

    newChild.setTexture(texture).setScale(0.12, 0.12)

    Asteroides.setCollider(newChild)

    newChild.body.pushable = false;

    return newChild;

  }

  static setCollider(asteroide: Child) {
    if (asteroide.texture.key == 'asteroide.1')
      asteroide.body.setCircle(
        asteroide.height * 0.45,
        asteroide.height * 0.05,
        asteroide.height * 0.05
      )
    if (asteroide.texture.key == 'asteroide.2')
      asteroide.body.setCircle(
        asteroide.height * 0.32,
        asteroide.height * 0.18,
        asteroide.height * 0.18
      )
  }
}