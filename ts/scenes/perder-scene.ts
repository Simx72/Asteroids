import AsteroidsScene from './templates/asteroids-scene';
export default class AsteroidsLooseScene extends AsteroidsScene {
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({
      active: false,
      visible: false,
      key: 'loose-scene',
    });
  }

  preload() {
    this.centerX = this.scale.width / 2
    this.centerY = this.scale.height / 2
  }

  create() {

    if (this.physics.config.debug) {
      this.objeto(
        'texto.debug',
        this.add.text(0, 0, `[scene]: Perder Scene (${this.scene.key}) \n\n`).setOrigin(0, 0).setPosition(10, 10).setDepth(100)
      );
    }

    let texto = this.add.text(
      this.centerX,
      this.centerY,
      'Perdiste!',
      { fontFamily: this.defaultFont }
    ).setOrigin(0.5, 0.5)
      .setFontSize(this.scale.width * 0.08)
      .setColor('#a60000')

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
      this.game.scene.switch('loose-scene', 'main-scene')
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