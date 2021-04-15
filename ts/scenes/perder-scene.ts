import { cookies } from '../functions/cookie-manager';
import AsteroidsScene from './templates/asteroids-scene';
import { cargarMenu } from '../functions/cargar-menu';
export default class AsteroidsLooseScene extends AsteroidsScene {
  constructor() {
    super({
      active: false,
      visible: false,
      key: 'loose-scene',
    });
  }

  preload() {
    this.defaultPreload()
  }

  create() {
    document.body.classList.toString().split(' ').forEach(val => document.body.classList.remove(val))
    document.body.classList.add('loose')
    this.dato('puntos', cookies.getNum('puntos', true))
    cookies.remove('puntos')
    cargarMenu.bind(this)()

    let musica = this.sound.add('audio.crystal-cave')
    musica.play('', {
      loop: true,
      volume: cookies.getNum('config-volumen-musica', true) / 100
    })

    if (this.physics.config.debug) {
      this.objeto(
        'texto.debug',
        this.add.text(0, 0, `[scene]: Perder Scene (${this.scene.key}) \n\nPuntos: ${this.dato<number>('puntos')}\n`).setOrigin(0, 0).setPosition(10, 10).setDepth(100)
      );
    } else {
      this.objeto(
        'texto.puntos',
        this.add.text(0, 0, 'Tu puntaje: ' + this.dato<number>('puntos'), { fontFamily: this.defaultFont, fontSize: '25pt' }).setOrigin(0, 0).setPosition(10, 10).setDepth(70)
      )
    }

    let texto = this.add.text(
      this.centerX,
      this.centerY,
      'Perdiste!',
      { fontFamily: this.defaultFont }
    ).setOrigin(0.5, 0.5)
      .setFontSize(this.scale.width * 0.08)
      .setColor('#e40F0F')

    let button = this.add.rectangle(
      this.centerX,
      texto.y + texto.displayHeight / 2 + 10,
      this.scale.width * 0.3,
      this.scale.height * 0.13,
      0xFFFFFF
    ).setOrigin(0.5, 0).setInteractive()

    let buttonCenter = button.getCenter()

    let buttonTexto = this.add.text(
      buttonCenter.x,
      buttonCenter.y,
      'Reiniciar',
      { fontFamily: this.defaultFont }
    ).setOrigin(0.5, 0.5)

    buttonTexto.setFontSize(this.scale.width * 0.04)
    buttonTexto.setColor('#000000')

    button.on('pointerdown', () => {
      cookies.check('pausa')
        .catch(() => {
          button.setFillStyle(0xFFFFFF)
          this.game.scene.start('game-scene')
          this.game.canvas.style.cursor = 'default'
        })
    })
    button.on('pointerover', () => {
      cookies.check('pausa')
        .catch(() => {
          this.game.canvas.style.cursor = 'pointer'
          button.setFillStyle(0xDDDD33)
        })
    })
    button.on('pointerout', () => {
      cookies.check('pausa')
        .catch(() => {
          this.game.canvas.style.cursor = 'default'
          button.setFillStyle(0xFFFFFF)
        })
    })
  }
}