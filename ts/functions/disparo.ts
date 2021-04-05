import AsteroidsMainScene from '../scenes/game-scene';
export default function disparo(this: AsteroidsMainScene) {

  const nave = this.objeto<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>('nave')

  let disparos = this.objeto<Phaser.Physics.Arcade.Group>('grupo.disparos')

  let disp = disparos.create(nave.x, nave.y) as Phaser.Types.Physics.Arcade.ImageWithDynamicBody

  disp.setAngle(nave.angle)

  disp.body.angle = Phaser.Math.DegToRad(disp.angle)

  let angle = ((nave.angle - 90 >= 0) ? nave.angle : 360 + nave.angle) - 90,
    vel = 350,
    vX = vel * Math.cos(Phaser.Math.DegToRad(angle)),
    vY = vel * Math.sin(Phaser.Math.DegToRad(angle));

  disp.setVelocity(vX, vY)

  if (this.physics.config.debug) {
    // const texto = this.objeto<Phaser.GameObjects.Text>('texto.debug')
    console.log('disparo')
    console.log(disp.angle, disp.body.angle, nave.angle, nave.body.angle)
  };

}