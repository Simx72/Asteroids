import AsteroidsMainScene from '../scenes/main-scene';
export default function updateNave(game: AsteroidsMainScene) {


  const nave = game.objeto<Phaser.Types.Physics.Arcade.ImageWithDynamicBody>('nave')

  if (game.physics.config.debug) {
    const texto = <Phaser.GameObjects.Text>game.objeto('texto.debug')
    texto.text += `posición: \tx ${Math.floor(nave.x)} \t| y ${Math.floor(nave.y)} \n`
    texto.text += `velocidad:\tx ${Math.floor(nave.body.velocity.x)} \t| y ${Math.floor(nave.body.velocity.y)} \n`
    texto.text += `ángulo: \t${Math.floor(nave.angle)} \n`
    texto.text += `vidas: \t${game.dato<number>('vidas') + 1} (${game.dato<number>('vidas')}) \n`
  }

  const keys = {
    'up-arrow': game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
    'down-arrow': game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
    'right-arrow': game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
    'left-arrow': game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
    'W': game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    'S': game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    'D': game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    'A': game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    'space': game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    'c': game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
  }

  let pressed = {
    up: (keys['up-arrow'].isDown || keys['W'].isDown),
    down: (keys['down-arrow'].isDown || keys['S'].isDown),
    right: (keys['right-arrow'].isDown || keys['D'].isDown),
    left: (keys['left-arrow'].isDown || keys['A'].isDown),
  }


  if (pressed.up || pressed.down) {

    let angle = ((nave.angle - 90 >= 0) ? nave.angle : 360 + nave.angle) - 90
    let accel = 250
    let aX = accel * Math.cos(Phaser.Math.DegToRad(angle))
    let aY = accel * Math.sin(Phaser.Math.DegToRad(angle))


    if (pressed.up && !pressed.down) {
      nave.body.setAcceleration(aX, aY)
    } else if (pressed.down && !pressed.up) {
      nave.body.setAcceleration(-aX, -aY)
    }
  } else {
    nave.body.setAcceleration(0, 0)
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
  if (game.input.keyboard.checkDown(keys['space'], 700)) {
    game.disparo()
  }

  if (nave.x < (0 - (nave.displayWidth / 2)) || nave.x > (game.scale.width + nave.displayWidth / 2) || nave.y < (0 - (nave.displayHeight / 2)) || nave.y > (game.scale.height + nave.displayHeight / 2)) {
    /* al morir en algun borde */
    game.muerte()
  }

}