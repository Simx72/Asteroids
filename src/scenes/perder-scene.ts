import cookies from '../cookies';
import AsteroidsScene from './templates/asteroids-scene';
import { cargarMenu } from '../functions/cargar-menu';
import { sendError } from '../functions/error';
export default class AsteroidsLooseScene extends AsteroidsScene {
  constructor() {
    super('loose-scene');
  }

  create() {
    super.create()
    try {

      document.body.classList.forEach(val => document.body.classList.remove(val))
      document.body.classList.add('loose')
      this.data.set('puntos', cookies.getNum('puntos', true))
      cookies.remove('puntos')
      cargarMenu.bind(this)()

      if (this.physics.config.debug)
        this.add.text(0, 0, `[scene]: Perder Scene (${this.scene.key}) \n\nPuntos: ${this.dato<number>('puntos')}\n`)
          .setName('texto.debug')
          .setOrigin(0, 0)
          .setPosition(10, 10)
          .setDepth(100)
      else
        this.add.text(0, 0, 'Tu puntaje: ' + this.dato<number>('puntos'), { fontSize: '25pt' })
          .setName('texto.puntos')
          .setOrigin(0, 0)
          .setPosition(10, 10)
          .setDepth(70)

      let texto = this.add.text(
        this.center.x,
        this.center.y,
        'Perdiste!'
      ).setOrigin(0.5, 0.5)
        .setFontSize(this.scale.width * 0.08)
        .setColor('#e40F0F')

      let button = this.add.rectangle(
        this.center.x,
        texto.y + texto.displayHeight / 2 + 10,
        this.scale.width * 0.3,
        this.scale.height * 0.13,
        0xFFFFFF
      ).setOrigin(0.5, 0).setInteractive()

      let buttonCenter = button.getCenter()

      let buttonTexto = this.add.text(
        buttonCenter.x,
        buttonCenter.y,
        'Reiniciar'
      ).setOrigin(0.5, 0.5)

      buttonTexto.setFontSize(this.scale.width * 0.04)
      buttonTexto.setColor('#000000')

      button.on('pointerdown', () => {
        if (cookies.get('jugando') == "true") {
          button.setFillStyle(0xFFFFFF)
          if (this.scale.width == window.innerWidth) {
            this.game.scene.stop(this).run('game-scene')
          } else {
            location.reload()
          }
          this.game.canvas.style.cursor = 'default'
        }
      })
      button.on('pointerover', () => {
        if (cookies.get('jugando') == "true") {
          this.game.canvas.style.cursor = 'pointer'
          button.setFillStyle(0xDDDD33)
        }
      })
      button.on('pointerout', () => {
        if (cookies.get('jugando') == "true") {
          this.game.canvas.style.cursor = 'default'
          button.setFillStyle(0xFFFFFF)
        }
      })
    } catch (e) {
      sendError(e, this.physics.config.debug)
    }
  }
}