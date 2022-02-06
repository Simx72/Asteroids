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
      let side: Asteroides.Borde | undefined;
      if (res != null) {
        side = <Asteroides.Borde>parseInt(res)
      } else {
        side = undefined;
      }
      this.asteroides.nuevoAsteroide(side)
    });
  }

}