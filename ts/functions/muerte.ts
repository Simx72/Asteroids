import AsteroidsMainScene from '../scenes/main-scene';
export function muerte(game: AsteroidsMainScene) {
  if (game.dato('vivo')) {
    if (game.dato('vidas', game.dato<number>('vidas') - 1) < 0) {
      perder(game)
    } else {

      if (game.physics.config.debug) console.log(game.dato('vidas'));

      let restart = () => {
        game.physics.resume()

        exp.setVisible(false)
          .on('animationcomplete', () => { })

        if (game.dato<number>('vidas') >= 0) {
          nave.setPosition(game.scale.width / 2, game.scale.height / 2)
            .setRotation(0)
            .setVisible(true)
            .body.setVelocity(0, 0)
              /* body */.setAcceleration(0, 0)
              /* body */.setAngularVelocity(0)


          game.dato('vivo', true)


          let vidas = game.objeto<Phaser.GameObjects.Group>('grupo.vidas')

          vidas.children.each(vida => vida.destroy()).clear()

          vidas.createMultiple({
            quantity: game.dato('vidas'),
            "setXY.x": game.scale.width - (game.dato<number>('vidas') * (nave.displayWidth + 3)),
            "setXY.stepX": nave.displayWidth + 2,
            key: 'nave',
            setScale: { x: 0.06, y: 0.06 },
            setOrigin: { x: 0, y: 0 }
          })

        }

      }

      game.dato('vivo', false)

      const nave = game.objeto<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>('nave')

      nave.body.setVelocity(0, 0)
      /* body */.setAcceleration(0, 0)
      /* body */.setAngularVelocity(0)

      if (game.physics.config.debug) {
        const texto = <Phaser.GameObjects.Text>game.objeto('texto.debug')
        texto.text += `muerte detectada! \n`
        console.log('perdiste!')
      }

      nave.setVisible(false)

      let exp = game.objeto<Phaser.GameObjects.Sprite>('explosion')
      exp
        .setPosition(nave.x, nave.y)
        .setVisible(true)
        .on('animationcomplete', restart)
        .anims.play('explotar')

      let audio = game.sound.add('audio.explo')
      audio.play()

      game.physics.pause() /* stops everything */

    }
  }
}

export function detectarMuerte(game: AsteroidsMainScene) {
  game.physics.add.overlap(
    game.objeto<Phaser.Physics.Arcade.Group>('grupo.ast'),
    game.objeto<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>('nave'),
    () => muerte(game)
  )
}

function perder(game: AsteroidsMainScene) {
  if (game.physics.config.debug) {
    const texto = <Phaser.GameObjects.Text>game.objeto('texto.debug')
    texto.text += `Sin vidas! \n`
  }
  game.dato('vivo', false)

  let exp = game.objeto<Phaser.GameObjects.Sprite>('explosion')

  let end = () => {
    game.scene.stop('main-scene').run('loose-scene')
  }

  const nave = game.objeto<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>('nave')

  nave.setVisible(false)

  exp
    .setPosition(nave.x, nave.y)
    .setVisible(true)
    .on('animationcomplete', end)
    .anims.play('explotar')

  let audio = game.sound.add('audio.explo')
  audio.play()

  game.physics.pause() /* stops everything */

}