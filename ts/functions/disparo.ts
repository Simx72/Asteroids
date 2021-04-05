import AsteroidsMainScene from '../scenes/main-scene';
export default function disparo(game: AsteroidsMainScene) {

  const nave = this.objeto<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>('nave')

  let disparos = this.objeto<Phaser.Physics.Arcade.Group>('grupo.disparos')

  let disp = disparos.create(nave.x, nave.y) as Phaser.Types.Physics.Arcade.ImageWithDynamicBody

  disp.setAngle(nave.angle)

  disp.body.angle = Phaser.Math.DegToRad(disp.angle)

  if (this.physics.config.debug) {
    // const texto = this.objeto<Phaser.GameObjects.Text>('texto.debug')
    console.log('disparo')
    console.log(disp.angle, disp.body.angle, nave.angle, nave.body.angle)
  };

}