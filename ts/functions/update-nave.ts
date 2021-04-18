import AsteroidsMainScene from '../scenes/game-scene';
export default function updateNave(this: AsteroidsMainScene) {


  const nave = this.objeto<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>('nave')

  if (this.physics.config.debug) {
    const texto = <Phaser.GameObjects.Text>this.objeto('texto.debug')
    texto.text += `posición: \tx ${Math.floor(nave.x)} \t| y ${Math.floor(nave.y)} \n`
    texto.text += `velocidad:\tx ${Math.floor(nave.body.velocity.x)} \t| y ${Math.floor(nave.body.velocity.y)} \n`
    texto.text += `ángulo: \t${Math.floor(nave.angle)} \n`
    texto.text += `vidas: \t${this.dato<number>('vidas') + 1} (${this.dato<number>('vidas')}) \n`
    texto.text += `puntos: \t${this.dato<number>('puntos')} \n`
  } else {
    this.objeto<Phaser.GameObjects.Text>('texto.puntos').text = this.dato<number>('puntos').toString()
  }

  const keys = {
    'up-arrow': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
    'down-arrow': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
    'right-arrow': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
    'left-arrow': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
    'W': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    'S': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    'D': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    'A': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    'space': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    'c': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
  }

  let pressed = {
    up: (keys['up-arrow'].isDown || keys['W'].isDown),
    down: (keys['down-arrow'].isDown || keys['S'].isDown),
    right: (keys['right-arrow'].isDown || keys['D'].isDown),
    left: (keys['left-arrow'].isDown || keys['A'].isDown),
  }


  if (pressed.up || pressed.down) {

    let angle = nave.angle
    let accel = 250
    let aX = accel * Math.sin(Phaser.Math.DegToRad(angle))
    let aY = accel * Math.cos(Phaser.Math.DegToRad(angle)) * -1


    if (pressed.up && !pressed.down) {
      nave.body.setAcceleration(aX, aY)
    } else if (pressed.down && !pressed.up) {
      nave.body.setAcceleration(-aX, -aY)
    }

  } else {
    try {
      nave.body.setAcceleration(0, 0)
    } catch (e) { }
  }

  if (pressed.right || pressed.left) {
    if (pressed.right && !pressed.left) {
      nave.body.setAngularVelocity(140)
    } else if (pressed.left && !pressed.right) {
      nave.body.setAngularVelocity(-140)
    }
  } else {
    nave.body.setAngularVelocity(0)
  }

  /* disparo */
  if (this.input.keyboard.checkDown(keys['space'], 250) && this.dato('vivo') == true) {
    this.disparo()
  }
  let disparos = this.objeto<Phaser.Physics.Arcade.Group>('grupo.disparos')
  disparos.children.each(object => {
    let obj = object as Phaser.Physics.Arcade.Sprite
    if (obj.body.position.x < (0 - obj.displayWidth) || obj.body.position.x > (this.scale.width + obj.displayWidth) || obj.body.position.y < (0 - obj.displayHeight) || obj.body.position.y > (this.scale.height + obj.displayHeight)) {
      obj.destroy()
      if (this.physics.config.debug) {
        console.log(obj, 'salio del mapa')
      }
    }
  })

  if (nave.x < (0 - (nave.displayWidth / 2)) || nave.x > (this.scale.width + nave.displayWidth / 2) || nave.y < (0 - (nave.displayHeight / 2)) || nave.y > (this.scale.height + nave.displayHeight / 2)) {
    /* al morir en algun borde */
    this.muerte()
  }

}