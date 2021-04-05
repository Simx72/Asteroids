import AsteroidsScene from './templates/asteroids-scene';
import disparo from '../functions/disparo';
import { muerte, detectarMuerte } from '../functions/muerte';
import createNave from '../functions/create-nave';
import createAsteroides from '../functions/create-asteroides';
import updateNave from '../functions/update-nave';

export default class AsteroidsMainScene extends AsteroidsScene {
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({
      active: false,
      visible: false,
      key: 'game-scene',
    });
  }

  disparo = () => disparo.bind(this)
  muerte = () => muerte.bind(this)

  /***************
   * PRELOAD
   **************/
  public preload() {
    this.centerX = this.game.scale.width / 2;
    this.centerY = this.game.scale.height / 2;

    this.load.audio('audio.laser', 'assets/sounds/laser.wav')
    this.load.audio('audio.explo', 'assets/sounds/explosion.wav')

    this.load.svg('nave', 'assets/images/SVG/nave-espacial.svg')
    this.load.svg('asteroide.1', 'assets/images/SVG/asteroide-1.svg')
    this.load.svg('asteroide.2', 'assets/images/SVG/asteroide-2.svg')
    this.load.svg('asteroide.3', 'assets/images/SVG/asteroide-3.svg')

    this.load.image('laser', 'assets/images/PNG/EnemyLaser.png')

    this.load.spritesheet({
      key: 'explosion',
      url: 'assets/images/PNG/exp2_0.png',
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

    createNave.bind(this)

    createAsteroides.bind(this)

    detectarMuerte.bind(this)

  }

  /***************
   * UPDATE
   **************/
  public update() {

    if (this.physics.config.debug) {
      const texto = <Phaser.GameObjects.Text>this.objeto('texto.debug')
      texto.text = `[scene]: Main Scene (${this.scene.key}) \n\n`
      texto.text += JSON.stringify(this.objeto<Phaser.Physics.Arcade.Group>('grupo.disparos').getChildren().map(gameObj => {
        let obj: { [c: string]: any } = {
          x: gameObj.body.position.x,
          y: gameObj.body.position.y
        }

        if ('angle' in gameObj) obj['angle'] = gameObj['angle']

        return obj

      })) + '\n'
    }

    updateNave.bind(this)

    let asteroides = <Phaser.GameObjects.Group>this.objeto('grupo.ast')

    asteroides.rotate(Phaser.Math.DegToRad(3))




  }


}