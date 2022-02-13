import Scene from '../scenes/templates/default';
import cookies from '../cookies';

export function explosion(this: Scene, x: number, y: number) {
  let exp = this.add.sprite(x, y, 'explosion').setVisible(false)

  exp.anims.create({
    key: 'explotar',
    frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }),
    frameRate: 40,
    repeat: 0
  })

  let audio = this.sound.add('audio.explo')
  audio.once('complete', () => {
    audio.destroy()
  })
  audio.play('', {
    volume: cookies.getNum('config-volumen-fx', true) / 100 * 0.4
  })

  return new Promise<Phaser.GameObjects.Sprite>((resolve, reject) => {
    exp
    .setPosition(x, y)
    .setVisible(true)
      .once('animationcomplete', () => {
        resolve(exp)
        exp.destroy()
      })
    .anims.play('explotar')
  })

}