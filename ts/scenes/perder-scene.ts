import AsteroidsScene from './templates/asteroids-scene';
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
    let regexres = (/puntos=(\d+)/g).exec(document.cookie)
    if (regexres != null) {
      this.dato('puntos', parseInt(regexres[1]))
    } else {
      this.dato('puntos', 0)
    }
    if (this.physics.config.debug) {
      console.log(regexres, document.cookie, this.dato('puntos'))
    }
    document.cookie = 'puntos=null'
    
  }

  create() {

    if (this.physics.config.debug) {
      this.objeto(
        'texto.debug',
        this.add.text(0, 0, `[scene]: Perder Scene (${this.scene.key}) \n\nPuntos: ${this.dato<number>('puntos')}\n`).setOrigin(0, 0).setPosition(10, 10).setDepth(100)
      );
    } else {
      this.objeto(
        'texto.puntos',
        this.add.text(0, 0, 'Tu puntaje: '+this.dato<number>('puntos'), { fontFamily: this.defaultFont, fontSize: '25pt' }).setOrigin(0, 0).setPosition(10, 10).setDepth(70)
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
      button.setFillStyle(0xFFFFFF)
      this.game.scene.switch('loose-scene', 'game-scene')
      this.game.canvas.style.cursor = 'default'
    })
    button.on('pointerover', () => {
      this.game.canvas.style.cursor = 'pointer'
      button.setFillStyle(0xDDDD33)
    })
    button.on('pointerout', () => {
      this.game.canvas.style.cursor = 'default'
      button.setFillStyle(0xFFFFFF)
    })
  }
}