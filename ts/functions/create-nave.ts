import AsteroidsMainScene from '../scenes/game-scene';
import { actualizarFondo } from './cargar-menu';
export default function createNave(this: AsteroidsMainScene) {
  const nave = this.objeto(
    'nave',
    this.physics.add.image(this.centerX, this.centerY, 'nave')
  ).setScale(0.06).setOrigin(0.5, 0.5).setDepth(10)

  this.dato('vivo', true)
  this.dato('vidas', 2)
  this.dato('puntos', 0)

  let vidas = this.objeto(
    'grupo.vidas',
    this.add.group()
  )

  this.dato('intervalo puntos', window.setInterval(() => {
    this.dato('puntos', this.dato<number>('puntos') + 1)
    actualizarFondo.bind(this)()
  }, 3000))

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

  this.input.keyboard.on('keydown-SPACE', () => {
    if (this.dato('vivo') == true) {
      this.disparo()
    }
  });


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


  this.objeto(
    'grupo.disparos',
    this.physics.add.group([], {
      defaultKey: 'fueguito.22',
      key: 'fueguito.22'
    })
  )

}