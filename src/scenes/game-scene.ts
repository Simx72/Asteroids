import Scene from './default';
import asset_audiolaser from '../assets/sounds/laser.wav';
import asset_naveespacial from '../assets/images/SVG/nave-espacial.svg';
import asset_asteroide1 from '../assets/images/SVG/asteroide-1.svg';
import asset_asteroide2 from '../assets/images/SVG/nave-espacial.svg';
import asset_asteroide3 from '../assets/images/SVG/nave-espacial.svg';
import asset_fueguito22 from '../assets/images/PNG/fueguito/efecto_fuego_00022.png';
import asset_cargando from '../assets/images/PNG/loading/atlas/spritesheet.png';
import asset_cargandoinfo from '../assets/images/PNG/loading/atlas/spritesheet.json';
import Nave from '../components/Nave';
import Asteroides from '../components/Asteroides';
import explosion from '../components/explosion';

export default class GameScene extends Scene {
  static key = 'game-scene';

  constructor() {
    super(GameScene.key);
  }

  /***************
   * PRELOAD
   **************/
  public preload() {
    super.preload();

    this.load.audio('audio.laser', asset_audiolaser)
    explosion.preload(this);

    this.load.svg('nave', asset_naveespacial)
    this.load.svg('asteroide.1', asset_asteroide1)
    this.load.svg('asteroide.2', asset_asteroide2)
    this.load.svg('asteroide.3', asset_asteroide3)

    this.load.image('fueguito.22', asset_fueguito22)

    this.load.atlas('cargando', asset_cargando, asset_cargandoinfo)

  }

  nave!: Nave;
  asteroides!: Asteroides;

  /***************
   * CREATE
   **************/
  public create() {
    super.create();


    this.data.set('cargado', false);

    let cargando = this.add.sprite(this.center.x, 10, 'cargando', 'frame-0.png')
    cargando.setName('cargando.sprite')

    cargando.setOrigin(0.5, 0).setDepth(100)

    this.add.rectangle(this.center.x, this.center.y, this.scale.width + 4, this.scale.height + 4)
      .setName('cargando.rect')
      .setDepth(99)
      .setFillStyle(0x000000)
      .setStrokeStyle(2, 0xFFFFFF)

    this.add.image(this.center.x, this.center.y, 'controles')
      .setName('cargando.controles')
      .setOrigin(0.5, 0.5)
      .setPosition(this.center.x, this.center.y).setDepth(98)
      .setDisplaySize(this.scale.width, this.scale.height)


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

    if (process.env.NODE_ENV == 'production') {
      this.add.text(0, 0, `[scene]: Main Scene (${this.scene.key}) \n\n`)
        .setName('texto.debug')
        .setOrigin(0, 0)
        .setPosition(10, 10)
        .setDepth(100)
    } else {
      this.add.text(0, 0, '0', { fontSize: '25pt' })
        .setName('texto.puntos')
        .setOrigin(0, 0)
        .setPosition(10, 10)
        .setDepth(70)
    }

    this.pausa.resume();

    this.nave = new Nave(this);
    this.asteroides = new Asteroides(this); 
  }

  /***************
   * UPDATE
   **************/
  public update(time: number, delta: number) {
    try {
      super.update(time, delta);

      this.nave.update();

      if (this.physics.config.debug) {
        const texto = this.getElement<Phaser.GameObjects.Text>('texto.debug')
        texto.text = `[scene]: Main Scene (${this.scene.key}) \n\n`
      }

      if (!this.dato<boolean>('cargado')) {
        this.getElement<Phaser.GameObjects.Sprite>('cargando.sprite').alpha -= 0.03
        this.getElement<Phaser.GameObjects.Rectangle>('cargando.rect').alpha -= 0.04
        this.getElement<Phaser.GameObjects.Image>('cargando.controles').alpha -= 0.04
      }
      if ((!this.dato<boolean>('cargado')) && (this.getElement<Phaser.GameObjects.Sprite>('cargando.rect').alpha == 0)) {
        this.getElement<Phaser.GameObjects.Sprite>('cargando.sprite').destroy()
        this.getElement<Phaser.GameObjects.Rectangle>('cargando.rect').destroy()
        this.getElement<Phaser.GameObjects.Image>('cargando.controles').destroy()
        this.data.set('cargado', true);
      }

    } catch (e) {
      throw e;
    }
  }

  finalizar() {
    if (this.physics.config.debug) {
      const texto = this.getElement<Phaser.GameObjects.Text>('texto.debug')
      texto.text += `Sin vidas! \n`
    }
    this.data.set('vivo', false)

    window.clearInterval(this.dato('intervalo puntos'))
    // cookies.set('puntos', this.dato<number>('puntos').toString())

    const nave = this.getElement<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>('nave')

    nave.setVisible(false)

    explosion(this, nave.x, nave.y)
      ?.then(() => {
        this.game.scene.stop(this).run('loose-scene')
      })

    this.physics.pause() /* stops everything */
  }

}