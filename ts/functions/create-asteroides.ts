import AsteroidsMainScene from '../scenes/game-scene';
export default function createAsteroides(this: AsteroidsMainScene) {
  let asteroides = this.objeto(
    'grupo.ast',
    this.physics.add.group([], {
      classType: Phaser.GameObjects.Image,
      defaultKey: 'asteroide.1',
      setScale: { x: 0.12, y: 0.12 },
      randomKey: true,
      setOrigin: { x: 0.5, y: 0.5 }
    })
  )

  asteroides.children.each((go: any) => {
    let ast = go as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    if (ast.texture.key == 'asteroide.1')
      ast.body.setCircle(
        ast.height * 0.45,
        ast.height * 0.05,
        ast.height * 0.05
      )
    if (ast.texture.key == 'asteroide.2')
      ast.body.setCircle(
        ast.height * 0.32,
        ast.height * 0.18,
        ast.height * 0.18
      )

    ast.body.pushable = false
  })

  this.physics.add.overlap(
    this.objeto<Phaser.Physics.Arcade.Group>('grupo.ast'),
    this.objeto<Phaser.Physics.Arcade.Group>('grupo.disparos'),
    (obj1, obj2) => {

      let asteroide = obj1 as Phaser.Physics.Arcade.Sprite
      let disparo = obj2 as Phaser.Physics.Arcade.Sprite

      let exp = this.objeto<Phaser.GameObjects.Sprite>('explosion')
      let astc = asteroide.getCenter()
      exp.setPosition(astc.x, astc.y)

      asteroide.destroy()
      disparo.destroy()

      exp
        .setVisible(true)
        .once('animationcomplete', () => exp.setVisible(false))
        .anims.play('explotar')

      let audio = this.sound.add('audio.explo')
      audio.play()

      if (this.physics.config.debug) {
        console.log(disparo, 'destruyo a', asteroide)
      }
    }
  )

}