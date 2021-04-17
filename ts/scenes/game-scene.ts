import AsteroidsScene from './templates/asteroids-scene';
import disparo from '../functions/disparo';
import { muerte, detectarMuerte } from '../functions/muerte';
import createNave from '../functions/create-nave';
import createAsteroides from '../functions/create-asteroides';
import updateNave from '../functions/update-nave';
import { updateAsteroides } from '../functions/update-asteroides';
import { cargarMenu } from '../functions/cargar-menu';
import { sendError } from '../functions/error';

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
    document.body.className = "loose"

    this.load.audio('audio.laser', 'sounds/laser.wav')
    this.load.audio('audio.explo', 'sounds/explosion.wav')

    this.load.svg('nave', 'images/SVG/nave-espacial.svg')
    this.load.svg('asteroide.1', 'images/SVG/asteroide-1.svg')
    this.load.svg('asteroide.2', 'images/SVG/asteroide-2.svg')
    this.load.svg('asteroide.3', 'images/SVG/asteroide-3.svg')

    this.load.image('fueguito.22', 'images/PNG/fueguito/efecto_fuego_00022.png')

    this.load.atlas('cargando', 'images/PNG/loading/atlas/spritesheet.png', 'images/PNG/loading/atlas/spritesheet.json')

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
    try {
      cargarMenu.bind(this)()
      this.dato('cargado', false)

      let cargando = this.objeto('cargando.sprite',
        this.add.sprite(this.centerX, 10, 'cargando', 'frame-0.png')
      )
      cargando.setOrigin(0.5, 0).setDepth(100)
      this.objeto('cargando.rect',
        this.add.rectangle(this.centerX, this.centerY, this.scale.width + 4, this.scale.height + 4).setDepth(99).setFillStyle(0x000000).setStrokeStyle(2, 0xFFFFFF)
      )
      this.objeto('cargando.controles',
        this.add.image(this.centerX, this.centerY, 'controles').setOrigin(0.5, 0.5).setScale(1, 1)
      )

      let cargandoFrames: Phaser.Types.Animations.AnimationFrame[] = []
      for (let i = 0; i < 31; i++) {
        cargandoFrames.push({ frame: `frame-${i}.png`, key: 'cargando', duration: 0 })
      }
      cargando.anims.create({
        key: 'cargar',
        frames: cargandoFrames,
        frameRate: 30,
        repeat: -1
      })
      cargando.anims.play('cargar')

      if (this.physics.config.debug) {
        this.objeto(
          'texto.debug',
          this.add.text(0, 0, `[scene]: Main Scene (${this.scene.key}) \n\n`).setOrigin(0, 0).setPosition(10, 10).setDepth(100)
        );
      } else {
        this.objeto(
          'texto.puntos',
          this.add.text(0, 0, '0', { fontFamily: this.defaultFont, fontSize: '25pt' }).setOrigin(0, 0).setPosition(10, 10).setDepth(70)
        )
      }

      createNave.bind(this)()

      createAsteroides.bind(this)()

      detectarMuerte.bind(this)()
    } catch (e) {
      sendError(e)
    }
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

    updateAsteroides.bind(this)()

    if (!this.dato<boolean>('cargado')) {
      this.objeto<Phaser.GameObjects.Sprite>('cargando.sprite').alpha -= 0.03
      this.objeto<Phaser.GameObjects.Rectangle>('cargando.rect').alpha -= 0.04
      this.objeto<Phaser.GameObjects.Image>('cargando.controles').alpha -= 0.04
    }
    if ((!this.dato<boolean>('cargado')) && (this.objeto<Phaser.GameObjects.Sprite>('cargando.rect').alpha == 0)) {
      this.objeto<Phaser.GameObjects.Sprite>('cargando.sprite').destroy()
      this.objeto<Phaser.GameObjects.Rectangle>('cargando.rect').destroy()
      this.objeto<Phaser.GameObjects.Image>('cargando.controles').destroy()
      this.dato('cargado', true)
    }
  }


}