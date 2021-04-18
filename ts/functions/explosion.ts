import AsteroidsMainScene from '../scenes/game-scene';
export function explosion(this: AsteroidsMainScene, x: number, y: number) {
  let exp = this.add.sprite(x, y, 'explosion').setVisible(false)

  exp.anims.create({
    key: 'explotar',
    frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }),
    frameRate: 40,
    repeat: 0
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