import AsteroidsMainScene from '../scenes/game-scene';
export default function disparo(this: AsteroidsMainScene) {

  const nave = this.objeto<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>('nave')

  let disparos = this.objeto<Phaser.Physics.Arcade.Group>('grupo.disparos')

  let disp = disparos.create(nave.x, nave.y, 'fueguito.22') as Phaser.Types.Physics.Arcade.ImageWithDynamicBody

  disp.setAngle(nave.angle + 90)

  disp.body.setCircle(disp.width / 2)

  disp.body.angle = Phaser.Math.DegToRad(disp.angle)

  let angle = ((nave.angle - 90 >= 0) ? nave.angle : 360 + nave.angle) - 90,
    vel = 350,
    vX = vel * Math.cos(Phaser.Math.DegToRad(angle)),
    vY = vel * Math.sin(Phaser.Math.DegToRad(angle));

  disp.setVelocity(vX, vY)

  if (this.physics.config.debug) {
    console.log('disparo')
  };

}