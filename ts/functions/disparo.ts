import AsteroidsMainScene from '../scenes/game-scene';
import { cookies } from './cookie-manager';
export default function disparo(this: AsteroidsMainScene) {

  const nave = this.objeto<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>('nave')

  let disparos = this.objeto<Phaser.Physics.Arcade.Group>('grupo.disparos')

  let disp = disparos.create(nave.x, nave.y, 'fueguito.22') as Phaser.Types.Physics.Arcade.ImageWithDynamicBody

  disp.displayWidth = 50;
  disp.displayHeight = 20;

  disp.setAngle(nave.angle - 90)

  disp.body.angle = Phaser.Math.DegToRad(disp.angle)
  let angle = (((nave.angle - 90 >= 0) ? nave.angle : 360 + nave.angle) - 90) + Phaser.Math.Between(-10, 10),
    vel = 350,
    rX = Math.cos(Phaser.Math.DegToRad(angle)),
    rY = Math.sin(Phaser.Math.DegToRad(angle));

  disp.body.setCircle(70, 150 + rX * 100, rY * 100)
  disp.setVelocity(rX * vel, rY * vel)

  let audio = this.sound.add('audio.laser')
  audio.play('', {
    volume: cookies.getNum('config-volumen-fx', true)/100
  })

  if (this.physics.config.debug) {
    console.log('disparo')
  };

}