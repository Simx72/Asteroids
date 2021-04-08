import AsteroidsMainScene from '../scenes/game-scene';
export function updateAsteroides(this: AsteroidsMainScene) {
  let asteroides = <Phaser.GameObjects.Group>this.objeto('grupo.ast')

  asteroides.rotate(Phaser.Math.DegToRad(3))
}