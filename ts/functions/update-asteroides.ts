import AsteroidsMainScene from '../scenes/game-scene';
import { nuevoAsteroide } from './create-asteroides';
export function updateAsteroides(this: AsteroidsMainScene) {
  let asteroides = <Phaser.Physics.Arcade.Group>this.objeto('grupo.ast')

  asteroides.rotate(Phaser.Math.DegToRad(3))
  asteroides.children.each(go => {
    let ast = go as Phaser.Physics.Arcade.Image
    if ((-ast.displayWidth / 2) > ast.x && (ast.displayWidth / 2 + this.scale.width) < ast.x && (-ast.displayHeight / 2) > ast.y && (ast.displayHeight / 2 + this.scale.height) < ast.y) ast.destroy()
  })

  if (!this.physics.config.debug) {
    if (this.game.getFrame() % 2 == 0 && this.dato('cargado')) {
      nuevoAsteroide.bind(this)()
    }
  }

}
