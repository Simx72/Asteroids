import AsteroidsScene from './templates/asteroids-scene';
import disparo from '../functions/disparo';
import { muerte, detectarMuerte } from '../functions/muerte';
import createNave from '../functions/create-nave';
import createAsteroides from '../functions/create-asteroides';
import updateNave from '../functions/update-nave';

export default class AsteroidsMainScene extends AsteroidsScene {
  constructor() {
    super({
      active: false,
      visible: false,
      key: 'game-scene',
    });
  }

  disparo = disparo.bind(this)
  muerte = muerte.bind(this)

  /***************
   * PRELOAD
   **************/
  public preload() {
    this.defaultPreload()

    this.load.audio('audio.laser', 'sounds/laser.wav')
    this.load.audio('audio.explo', 'sounds/explosion.wav')

    this.load.svg('nave', 'images/SVG/nave-espacial.svg')
    this.load.svg('asteroide.1', 'images/SVG/asteroide-1.svg')
    this.load.svg('asteroide.2', 'images/SVG/asteroide-2.svg')
    this.load.svg('asteroide.3', 'images/SVG/asteroide-3.svg')

    for (let i = 0; i < 50; i++) {
      i.valueOf
      this.load.image('fueguito.1', '../../../firebase/Y/asteroids-assets/images/PNG/fueguito/efecto_fuego_00049.png')
    }

    this.load.spritesheet({
      key: 'explosion',
      url: 'images/PNG/exp2_0.png',
      frameConfig: {
        frameWidth: 64,
        startFrame: 0,
        endFrame: 15,
        frameHeight: 64
      }
    })

  }

  /***************
   * CREATE
   **************/
  public create() {

    if (this.physics.config.debug) {
      this.objeto(
        'texto.debug',
        this.add.text(0, 0, `[scene]: Main Scene (${this.scene.key}) \n\n`).setOrigin(0, 0).setPosition(10, 10).setDepth(100)
      );
    }

    createNave.bind(this)()

    createAsteroides.bind(this)()

    detectarMuerte.bind(this)()

  }

  /***************
   * UPDATE
   **************/
  public update() {

    if (this.physics.config.debug) {
      const texto = <Phaser.GameObjects.Text>this.objeto('texto.debug')
      texto.text = `[scene]: Main Scene (${this.scene.key}) \n\n`
    }

    updateNave.bind(this)()

    let asteroides = <Phaser.GameObjects.Group>this.objeto('grupo.ast')

    asteroides.rotate(Phaser.Math.DegToRad(3))




  }


}