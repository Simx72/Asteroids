import AsteroidsMainScene from '../scenes/main-scene';
export default function createNave(game: AsteroidsMainScene) {
  const nave = game.objeto(
    'nave',
    game.physics.add.image(game.centerX, game.centerY, 'nave')
  ).setScale(0.06).setOrigin(0.5, 0.5)

  game.dato('vivo', true)
  game.dato('vidas', 2)

  let vidas = game.objeto(
    'grupo.vidas',
    game.add.group()
  )

  vidas.createMultiple({
    quantity: game.dato('vidas'),
    "setXY.x": game.scale.width - (game.dato<number>('vidas') * (nave.displayWidth + 3)),
    "setXY.stepX": nave.displayWidth + 2,
    key: 'nave',
    setScale: { x: 0.06, y: 0.06 },
    setOrigin: { x: 0, y: 0 }
  })

  nave.body.setMaxSpeed(250)

  nave.body.setCircle(
    nave.width * 0.34,
    nave.width * 0.16,
    nave.width * 0.16
  )

  game.input.keyboard.on('keydown-SPACE', function () {
    game.disparo()
  });


  let exp = game.objeto('explosion',
    game.add.sprite(nave.x, nave.y, 'explosion')
  )

  exp.anims.create({
    key: 'explotar',
    frames: game.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }),
    frameRate: 60,
    repeat: 0
  })

  exp.setVisible(false)


  game.objeto(
    'grupo.disparos',
    game.physics.add.group()
  )

}