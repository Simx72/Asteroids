import AsteroidsMainScene from '../scenes/game-scene';
export default function createAsteroides(this: AsteroidsMainScene) {
  let asteroides = this.objeto(
    'grupo.ast',
    this.physics.add.group([], {
      classType: Phaser.GameObjects.Image
    })
  )


  let creado = asteroides.createMultiple(
    {
      quantity: 4,
      key: ['asteroide.1', 'asteroide.2'],
      setScale: { x: 0.12, y: 0.12 },
      randomKey: true
    }
  )

  Phaser.Actions.PlaceOnCircle(
    creado,
    new Phaser.Geom.Circle(
      this.centerX,
      this.centerY,
      this.scale.height * 0.4
    )
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
      exp.setPosition(asteroide.body.position.x, asteroide.body.position.y)

      asteroide.destroy()
      disparo.destroy()

      exp
        .setVisible(true)
        .on('animationcomplete', () => exp.setVisible(false))
        .anims.play('explotar')

      let audio = this.sound.add('audio.explo')
      audio.play()

      if (this.physics.config.debug) {
        console.log(disparo, 'destruyo a', asteroide)
      }
    }
  )

}