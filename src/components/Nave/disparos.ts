import Nave from './index';
export default class Disparos extends Phaser.Physics.Arcade.Group {
  constructor(nave: Nave, key: string) {
    super(nave.scene.physics.world, nave.scene, [], { defaultKey: key, key });
    this.setName('grupo.disparos');

    this.nave = nave;
    
  }

  nave: Nave;

  disparo() {
    const nave = this.nave

    let disp = this.create(nave.x, nave.y, 'fueguito.22') as Phaser.Types.Physics.Arcade.ImageWithDynamicBody

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

    let audio = this.nave.scene.sound.add('audio.laser')

    audio.play('', {
      volume: this.nave.scene.audio.fxVolume
    })

    if (this.nave.scene.physics.config.debug) {
      console.log('disparo')
    };
  }
}