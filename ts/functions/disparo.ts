import AsteroidsMainScene from '../scenes/main-scene';
export default function disparo(game: AsteroidsMainScene) {

  const nave = game.objeto<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>('nave')

  let disparos = game.objeto<Phaser.Physics.Arcade.Group>('grupo.disparos')

  let disp = disparos.create(nave.x, nave.y) as Phaser.Types.Physics.Arcade.ImageWithDynamicBody

  disp.setAngle(nave.angle)

  disp.body.angle = Phaser.Math.DegToRad(disp.angle)

  if (game.physics.config.debug) {
    // const texto = game.objeto<Phaser.GameObjects.Text>('texto.debug')
    console.log('disparo')
    console.log(disp.angle, disp.body.angle, nave.angle, nave.body.angle)
  };

}