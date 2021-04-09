import AsteroidsMainScene from '../scenes/game-scene';
export default function createAsteroides(this: AsteroidsMainScene) {
  this.objeto(
    'grupo.ast',
    this.physics.add.group([], {
      classType: Phaser.GameObjects.Image,
      defaultKey: 'asteroide.1',
      setScale: { x: 0.12, y: 0.12 },
      randomKey: true,
      setOrigin: { x: 0.5, y: 0.5 }
    })
  )

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

      this.dato('puntos', this.dato<number>('puntos') + 1)

      if (this.physics.config.debug) {
        console.log(disparo, 'destruyo a', asteroide)
      }
    }
  )

}