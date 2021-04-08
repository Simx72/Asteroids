import AsteroidsMainScene from '../scenes/game-scene';
export function updateAsteroides(this: AsteroidsMainScene) {
  let asteroides = <Phaser.Physics.Arcade.Group>this.objeto('grupo.ast')

  asteroides.rotate(Phaser.Math.DegToRad(3))

  if (this.game.getFrame() % 3 == 0) {
    let x = 0,
      y = 0,
      angulo = 0,
      vel = 0;
    
    asteroides.create(x, y)
  }
}