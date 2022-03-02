import Scene from '../../scenes/game-scene';
import Disparos from './disparos';
import { explosion } from '../../functions/explosion';

export let puntos: number = 0;

export default class Nave extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Scene) {
    super(scene, 0, 0, 'nave');

    this
      .setPosition(scene.center.x, scene.center.y)
      .setName('nave')
      .setScale(0.06)
      .setOrigin(0.5, 0.5)
      .setDepth(10)

    scene.add.existing(this)

    this.data.set('vivo', true)
    this.data.set('vidas', 2)
    this.data.set('intervalo puntos', window.setInterval(() => {
      if (scene.pausa.running)
        this.data.values.puntos++;
      scene.nivel.updateNivel()
    }, 3000))

    this.body.setMaxSpeed(250)
    this.body.setDrag(1, 1)

    this.body.setCircle(
      this.width * 0.34,
      this.width * 0.16,
      this.width * 0.16
    )

    scene.input.keyboard.on('keydown-SPACE', () => {
      if (this.data.get('vivo') == true)
        this.disparo()
    });


    let exp = scene.add.sprite(this.x, this.y, 'explosion')
      .setName('explosion')

    exp.anims.create({
      key: 'explotar',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }),
      frameRate: 60,
      repeat: 0
    })

    exp.setVisible(false)

    this.calcVidas()

    this.scene.physics.add.overlap(
      this.scene.asteroides,
      this,
      () => this.perderVida()
    )

    this.on(Phaser.GameObjects.Events.REMOVED_FROM_SCENE, () => {
      window.clearInterval(this.data.get('intervalo puntos'))
    })

  }

  type = 'Nave';
  disparos = new Disparos(this, 'fueguito.22');
  body: Phaser.Physics.Arcade.Body = new Phaser.Physics.Arcade.Body(this.scene.physics.world, this);

  private calcVidas() {
    this._vidas.clear(true, true)
      .createMultiple({
        quantity: this.data.values.vidas,
        "setXY.x": this.scene.scale.width - (this.data.values.vidas * (this.displayWidth + 3)),
        "setXY.stepX": this.displayWidth + 2,
        key: 'nave',
        setScale: { x: 0.06, y: 0.06 },
        setOrigin: { x: 0, y: 0 },
        "setDepth.value": 60
      })
  }

  private _vidas = this.scene.add.group()
    .setName('grupo.vidas')


  disparo = () => this.disparos.disparo()

  scene!: Scene;

  perderVida() {

    if (this.data.values.vivo) {
      if (this.data.values.vidas-- <= 0) {
        this.scene.finalizar()
      } else {

        if (this.scene.physics.config.debug) console.log(this.data.values.vidas);

        this.data.set('vivo', false)

        this.body.setVelocity(0, 0)
        /* body */.setAcceleration(0, 0)
        /* body */.setAngularVelocity(0)

        if (this.scene.physics.config.debug) {
          const texto = this.scene.getElement<Phaser.GameObjects.Text>('texto.debug')
          texto.text += `muerte detectada! \n`
          console.log('perdiste!')
        }

        this.setVisible(false)

        explosion.call(this.scene, this.x, this.y).then(
          () => this._restart
        )

        this.scene.physics.pause() /* stops everything */

      }
    }

  }

  private _restart() {
    this.scene.physics.resume()

    this.scene.asteroides.clear(true, true)
    this.disparos.clear(true, true)

    this.setPosition(this.scene.center.x, this.scene.center.y)
      .setRotation(0)
      .setVisible(true)
      .body.setVelocity(0, 0)
          /* body */.setAcceleration(0, 0)
          /* body */.setAngularVelocity(0)


    this.data.set('vivo', true)

    this.calcVidas()

  }

}