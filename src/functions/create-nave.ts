import AsteroidsMainScene from '../scenes/game-scene';
import cookies from '../cookies';
export default function createNave(this: AsteroidsMainScene) {
  const nave = this.physics.add.image(this.center.x, this.center.y, 'nave')
    .setName('nave')
    .setScale(0.06)
    .setOrigin(0.5, 0.5)
    .setDepth(10)

  this.data.set('vivo', true)
  this.data.set('vidas', 2)
  this.data.set('puntos', 0)

  let vidas = this.add.group()
    .setName('grupo.vidas')

  
  this.data.set('intervalo puntos', window.setInterval(() => {
    if (cookies.get('jugando') == 'true')
      this.data.set('puntos', this.dato<number>('puntos') + 1)
    this.nivel.updateNivel()
  }, 3000))

  vidas.createMultiple({
    quantity: this.dato('vidas'),
    "setXY.x": this.scale.width - (this.dato<number>('vidas') * (nave.displayWidth + 3)),
    "setXY.stepX": nave.displayWidth + 2,
    key: 'nave',
    setScale: { x: 0.06, y: 0.06 },
    setOrigin: { x: 0, y: 0 },
    "setDepth.value": 60
  })

  nave.body.setMaxSpeed(250)
  nave.body.setDrag(1, 1)

  nave.body.setCircle(
    nave.width * 0.34,
    nave.width * 0.16,
    nave.width * 0.16
  )

  this.input.keyboard.on('keydown-SPACE', () => {
    if (this.dato('vivo') == true) {
      this.disparo()
    }
  });


  let exp = this.add.sprite(nave.x, nave.y, 'explosion')
    .setName('explosion')

  exp.anims.create({
    key: 'explotar',
    frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }),
    frameRate: 60,
    repeat: 0
  })

  exp.setVisible(false)


  this.physics.add.group([], {
    defaultKey: 'fueguito.22',
    key: 'fueguito.22'
  }).setName('grupo.disparos')

}