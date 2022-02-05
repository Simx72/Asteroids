import AsteroidsMainScene from '../scenes/game-scene';
import cookies from '../cookies';
import { nuevoAsteroide } from './create-asteroides';
export function updateAsteroides(this: AsteroidsMainScene) {
  let asteroides = this.getElement<Phaser.Physics.Arcade.Group>('grupo.ast')

  asteroides.rotate(Phaser.Math.DegToRad(3))
  asteroides.children.each(go => {
    let ast = go as Phaser.Physics.Arcade.Image
    if ((-ast.displayWidth / 2) > ast.x && (ast.displayWidth / 2 + this.scale.width) < ast.x && (-ast.displayHeight / 2) > ast.y && (ast.displayHeight / 2 + this.scale.height) < ast.y) ast.destroy()
  })

  if (cookies.get('jugando') == 'true') {
    let densidad = 1;
    switch (this.dato('nivel')) {
      case 1:
        densidad = 4
        break;
      case 2:
        densidad = 3
        break;
      case 3:
        densidad = 2
        break;
      case 4:
        densidad = 1
        break;
    }

    if (this.game.getFrame() % densidad == 0 && this.dato('cargado') && !this.physics.config.debug) {
      nuevoAsteroide.bind(this)()
    }
  }

}
