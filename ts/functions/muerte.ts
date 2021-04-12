import AsteroidsMainScene from '../scenes/game-scene';
import Cookies from 'ts-cookies';
export function muerte(this: AsteroidsMainScene) {
  if (this.dato('vivo')) {
    if (this.dato('vidas', this.dato<number>('vidas') - 1) < 0) {
      perder.bind(this)()
    } else {

      if (this.physics.config.debug) console.log(this.dato('vidas'));

      let restart = () => {
        this.physics.resume()

        exp.setVisible(false)
          .on('animationcomplete', () => { })

        if (this.dato<number>('vidas') >= 0) {
          nave.setPosition(this.scale.width / 2, this.scale.height / 2)
            .setRotation(0)
            .setVisible(true)
            .body.setVelocity(0, 0)
              /* body */.setAcceleration(0, 0)
              /* body */.setAngularVelocity(0)


          this.dato('vivo', true)


          let vidas = this.objeto<Phaser.GameObjects.Group>('grupo.vidas')

          vidas.clear(true, true)

          vidas.createMultiple({
            quantity: this.dato('vidas'),
            "setXY.x": this.scale.width - (this.dato<number>('vidas') * (nave.displayWidth + 3)),
            "setXY.stepX": nave.displayWidth + 2,
            key: 'nave',
            setScale: { x: 0.06, y: 0.06 },
            setOrigin: { x: 0, y: 0 },
            "setDepth.value": 60
          })

        }

      }

      this.dato('vivo', false)

      this.objeto<Phaser.Physics.Arcade.Group>('grupo.ast').clear(true, true)

      const nave = this.objeto<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>('nave')

      nave.body.setVelocity(0, 0)
      /* body */.setAcceleration(0, 0)
      /* body */.setAngularVelocity(0)

      if (this.physics.config.debug) {
        const texto = <Phaser.GameObjects.Text>this.objeto('texto.debug')
        texto.text += `muerte detectada! \n`
        console.log('perdiste!')
      }

      nave.setVisible(false)

      let exp = this.objeto<Phaser.GameObjects.Sprite>('explosion')
      exp
        .setPosition(nave.x, nave.y)
        .setVisible(true)
        .once('animationcomplete', restart)
        .anims.play('explotar')

      let audio = this.sound.add('audio.explo')
      audio.play(void 0, {
        volume: Cookies.get('config-volume-fx')/100
      })

      this.physics.pause() /* stops everything */

    }
  }
}

export function detectarMuerte(this: AsteroidsMainScene) {
  this.physics.add.overlap(
    this.objeto<Phaser.Physics.Arcade.Group>('grupo.ast'),
    this.objeto<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>('nave'),
    muerte.bind(this)
  )
}

function perder(this: AsteroidsMainScene) {
  if (this.physics.config.debug) {
    const texto = <Phaser.GameObjects.Text>this.objeto('texto.debug')
    texto.text += `Sin vidas! \n`
  }
  this.dato('vivo', false)

  window.clearInterval(this.dato('intervalo puntos'))
  document.cookie = 'puntos=' + this.dato<number>('puntos')

  let exp = this.objeto<Phaser.GameObjects.Sprite>('explosion')

  let end = () => {
    this.scene.stop('game-scene').run('loose-scene')
  }

  const nave = this.objeto<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>('nave')

  nave.setVisible(false)

  exp
    .setPosition(nave.x, nave.y)
    .setVisible(true)
    .once('animationcomplete', end)
    .anims.play('explotar')

  let audio = this.sound.add('audio.explo')
  audio.play(void 0, {
    volume: Cookies.get('config-volume-fx')/100
  })

  this.physics.pause() /* stops everything */

}