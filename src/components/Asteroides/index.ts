import Scene from '../../scenes/templates/asteroids-scene';

type Child = Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

class Asteroides extends Phaser.GameObjects.Group {
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

    newChild.body = new Phaser.Physics.Arcade.Body(this.scene.physics.world, newChild)

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

  /**
   * Genera un nuevo asteroide en el borde especificado,
   * si no se proporciona una posicion se generara en un borde
   * al azar
   * @param pos - posicion en la que se genera el asteroide, 0=top, 1=right, 2=down y 3=left
   */
  nuevoAsteroide(pos?: Asteroides.Borde) {
    let side = <Asteroides.Borde>((typeof pos != 'undefined') ? pos : Phaser.Math.Between(0, 3));
    let x = 0, y = 0, angulo = 0, vel = 50;
  
    switch (side) {
      case 0:
        x = Phaser.Math.Between(0, this.scene.scale.width)
        y = -10
        angulo = (Phaser.Math.Between(0, 100) < 50) ? Phaser.Math.Between(135, 180) : Phaser.Math.Between(-179, -135);
        break;
      case 1:
        x = this.scene.scale.width + 10
        y = Phaser.Math.Between(0, this.scene.scale.height)
        angulo = Phaser.Math.Between(-135, -45)
        break;
      case 2:
        x = Phaser.Math.Between(0, this.scene.scale.width)
        y = this.scene.scale.height + 10
        angulo = Phaser.Math.Between(-45, 45)
        break;
      case 3:
        x = -10
        y = Phaser.Math.Between(0, this.scene.scale.height)
        angulo = Phaser.Math.Between(45, 135)
        break;
    }
  
    if (this.scene.physics.config.debug)
      if (typeof pos != 'undefined') console.log({ x, y, angulo, vel, sin: (vel * Math.sin(angulo)), cos: -(vel * Math.cos(angulo)) })
    
  
    let asteroide = this.create(x, y)
  
    function d2r(x: number) {
      return Phaser.Math.DegToRad(x);
    }
    asteroide.setVelocity(
      vel * Math.sin(d2r(angulo)),
      vel * Math.cos(d2r(angulo)) * -1
    )
  
  }

}

namespace Asteroides {
  export enum Borde {
    SUPERIOR,
    DERECHO,
    INFERIOR,
    IZQUIERDO
  }
}

export default Asteroides;