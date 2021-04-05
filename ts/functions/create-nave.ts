import AsteroidsMainScene from '../scenes/main-scene';
export default function createNave(this: AsteroidsMainScene) {
  const nave = this.objeto(
    'nave',
    this.physics.add.image(this.centerX, this.centerY, 'nave')
  ).setScale(0.06).setOrigin(0.5, 0.5)

  this.dato('vivo', true)
  this.dato('vidas', 2)

  let vidas = this.objeto(
    'grupo.vidas',
    this.add.group()
  )

  vidas.createMultiple({
    quantity: this.dato('vidas'),
    "setXY.x": this.scale.width - (this.dato<number>('vidas') * (nave.displayWidth + 3)),
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

  this.input.keyboard.on('keydown-SPACE', (function (this: AsteroidsMainScene) {
    this.disparo()
  }).bind(this));


  let exp = this.objeto('explosion',
    this.add.sprite(nave.x, nave.y, 'explosion')
  )

  exp.anims.create({
    key: 'explotar',
    frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }),
    frameRate: 60,
    repeat: 0
  })

  exp.setVisible(false)


  let disparos = this.objeto(
    'grupo.disparos',
    this.physics.add.group([])
  )

  disparos.add(this.add.circle(
    this.centerX,
    this.centerY,
    5, 0xFFFFFF
  ))

}