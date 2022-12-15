import Scene from '../../scenes/game-scene';
import explosion from '../explosion';
import Disparos from './disparos';

export let puntos: number = 0;

export default class Nave extends Phaser.Physics.Arcade.Sprite {

  get puntos() { return puntos; }

  constructor(scene: Scene) {
    super(scene, 0, 0, 'nave');

    this
      .setPosition(scene.center.x, scene.center.y)
      .setName('nave')
      .setScale(0.06)
      .setOrigin(0.5, 0.5)
      .setDepth(10)

    scene.add.existing(this)

    this.setData('vivo', true);
    this.setData('vidas', 2);
    this.setData('intervalo puntos', window.setInterval(() => {
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

  private _vidas = this.scene.add.group([])
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

        explosion(this.scene, this.x, this.y)?.then(
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

  update(): void {
    if (this.scene.physics.config.debug) {
      const texto = <Phaser.GameObjects.Text>this.scene.getElement('texto.debug')
      texto.text += `posición: \tx ${Math.floor(this.x)} \t| y ${Math.floor(this.y)} \n`
      texto.text += `velocidad:\tx ${Math.floor(this.body.velocity.x)} \t| y ${Math.floor(this.body.velocity.y)} \n`
      texto.text += `ángulo: \t${Math.floor(this.angle)} \n`
      texto.text += `vidas: \t${this.data.get('vidas') + 1} (${this.data.get('vidas')}) \n`
      texto.text += `puntos: \t${this.puntos} \n`
    } else {
      this.scene.getElement<Phaser.GameObjects.Text>('texto.puntos').text = this.puntos.toString()
    }

    const keys = {
      'up-arrow': this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      'down-arrow': this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      'right-arrow': this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      'left-arrow': this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      'W': this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      'S': this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      'D': this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      'A': this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      'space': this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      'c': this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
    }

    let pressed = {
      up: (keys['up-arrow'].isDown || keys['W'].isDown),
      down: (keys['down-arrow'].isDown || keys['S'].isDown),
      right: (keys['right-arrow'].isDown || keys['D'].isDown),
      left: (keys['left-arrow'].isDown || keys['A'].isDown),
    }


    if (pressed.up || pressed.down) {

      let angle = this.angle
      let accel = 250
      let aX = accel * Math.sin(Phaser.Math.DegToRad(angle))
      let aY = accel * Math.cos(Phaser.Math.DegToRad(angle)) * -1


      if (pressed.up && !pressed.down) {
        this.body.setAcceleration(aX, aY)
      } else if (pressed.down && !pressed.up) {
        this.body.setAcceleration(-aX, -aY)
      }

    } else {
      try {
        this.body.setAcceleration(0, 0)
      } catch (e) { }
    }

    if (pressed.right || pressed.left) {
      if (pressed.right && !pressed.left) {
        this.body.setAngularVelocity(140)
      } else if (pressed.left && !pressed.right) {
        this.body.setAngularVelocity(-140)
      }
    } else {
      this.body.setAngularVelocity(0)
    }

    /* disparo */
    if (this.scene.input.keyboard.checkDown(keys['space'], 250) && this.data.get('vivo') == true) {
      this.disparo()
    }
    let disparos = this.disparos
    disparos.children.each(object => {
      let obj = object as Phaser.Physics.Arcade.Sprite
      if (obj.body.position.x < (0 - obj.displayWidth) || obj.body.position.x > (this.scene.scale.width + obj.displayWidth) || obj.body.position.y < (0 - obj.displayHeight) || obj.body.position.y > (this.scene.scale.height + obj.displayHeight)) {
        obj.destroy()
        if (this.scene.physics.config.debug) {
          console.log(obj, 'salio del mapa')
        }
      }
    })

    if (this.x < (0 - (this.displayWidth / 2)) || this.x > (this.scene.scale.width + this.displayWidth / 2) || this.y < (0 - (this.displayHeight / 2)) || this.y > (this.scene.scale.height + this.displayHeight / 2)) {
      /* al morir en algun borde */
      this.perderVida()
    }
  }

}