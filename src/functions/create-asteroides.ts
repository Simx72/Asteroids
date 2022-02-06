import Asteroides from '../components/Asteroides';
import AsteroidsMainScene from '../scenes/game-scene';
import { explosion } from './explosion';
export default function createAsteroides(this: AsteroidsMainScene) {

  this.asteroides = new Asteroides(this);

  this.physics.add.overlap(
    this.asteroides,
    this.nave.disparos,
    (...params: any[]) => {
      const [asteroide, disparo] = params as Phaser.Types.Physics.Arcade.ImageWithDynamicBody[]

      let astc = asteroide.getCenter()
      asteroide.destroy()
      disparo.destroy()

      this.data.values.puntos++;
      
      explosion.call(this, astc.x, astc.y)
      
      this.nivel.updateNivel()

      if (this.physics.config.debug) {
        console.log(disparo, 'destruyo a', asteroide)
      }
    }
  )

  if (this.physics.config.debug) {
    this.input.keyboard.on('keydown-M', () => {
      let res = prompt("Posición: ", "")
      let side: 1 | 2 | 3 | 4 | undefined;
      if (res != null) {
        side = <(1 | 2 | 3 | 4)>parseInt(res)
      } else {
        side = undefined;
      }
      nuevoAsteroide.bind(this)(side)
    });
  }

}

export function nuevoAsteroide(this: AsteroidsMainScene, pos?: 1 | 2 | 3 | 4) {
  let side = <(1 | 2 | 3 | 4)>((typeof pos != 'undefined') ? pos : Phaser.Math.Between(1, 4));
  let x = 0, y = 0, angulo = 0, vel = 50;

  if (side === 1) {
    x = Phaser.Math.Between(0, this.scale.width)
    y = -10
    angulo = (Phaser.Math.Between(0, 100) < 50) ? Phaser.Math.Between(135, 180) : Phaser.Math.Between(-179, -135);
  } else if (side === 2) {
    x = this.scale.width + 10
    y = Phaser.Math.Between(0, this.scale.height)
    angulo = Phaser.Math.Between(-135, -45)
  } else if (side === 3) {
    x = Phaser.Math.Between(0, this.scale.width)
    y = this.scale.height + 10
    angulo = Phaser.Math.Between(-45, 45)
  } else if (side === 4) {
    x = -10
    y = Phaser.Math.Between(0, this.scale.height)
    angulo = Phaser.Math.Between(45, 135)
  }

  if (typeof pos != 'undefined') console.log({ x, y, angulo, vel, sin: (vel * Math.sin(angulo)), cos: -(vel * Math.cos(angulo)) })

  let asteroides = this.getElement<Phaser.Physics.Arcade.Group>('grupo.ast')
  let asteroide = asteroides.create(x, y) as Phaser.Physics.Arcade.Image

  let texture = ''

  switch (Phaser.Math.Between(1, 2)) {
    case 1: texture = 'asteroide.1'; break;
    case 2: texture = 'asteroide.2'; break;
    case 3: texture = 'asteroide.3'; break;
  }

  asteroide.setTexture(texture).setScale(0.12, 0.12)

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

  let d2r = (x: number) => Phaser.Math.DegToRad(x);
  asteroide.setVelocity(
    vel * Math.sin(d2r(angulo)),
    vel * Math.cos(d2r(angulo)) * -1
  )

  asteroide.body.pushable = false

}