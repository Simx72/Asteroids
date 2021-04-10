import AsteroidsMainScene from '../scenes/game-scene';
export function updateAsteroides(this: AsteroidsMainScene) {
  let asteroides = <Phaser.Physics.Arcade.Group>this.objeto('grupo.ast')

  asteroides.rotate(Phaser.Math.DegToRad(3))
  asteroides.children.each(go => {
    let ast = go as Phaser.Physics.Arcade.Image
    if ((-ast.displayWidth / 2) > ast.x && (ast.displayWidth / 2 + this.scale.width) < ast.x && (-ast.displayHeight / 2) > ast.y && (ast.displayHeight / 2 + this.scale.height) < ast.y) ast.destroy()
  })

  if (!this.physics.config.debug) {
    if (this.game.getFrame() % 2 == 0 && this.dato('cargado')) {
      nuevoAsteroide.bind(this)()
    }
  }

}

export function nuevoAsteroide(this: AsteroidsMainScene) {
  let side = Phaser.Math.Between(1, 4)
  let x = 0, y = 0, angulo = 0, vel = 50;

  if (side === 1) {
    x = Phaser.Math.Between(0, this.scale.width)
    y = -10
    angulo = Phaser.Math.Between(135, 225)
  } else if (side === 2) {
    x = this.scale.width + 10
    y = Phaser.Math.Between(0, this.scale.height)
    angulo = Phaser.Math.Between(-45, -135)
  } else if (side === 3) {
    x = Phaser.Math.Between(0, this.scale.width)
    y = this.scale.height + 10
    angulo = Phaser.Math.Between(-45, 45)
  } else if (side === 4) {
    x = -10
    y = Phaser.Math.Between(0, this.scale.height)
    angulo = Phaser.Math.Between(45, 135)
  }

  let asteroides = <Phaser.Physics.Arcade.Group>this.objeto('grupo.ast')
  let asteroide = asteroides.create(x, y) as Phaser.Physics.Arcade.Image

  let texture = ''

  switch (Phaser.Math.Between(1, 2)) {
    case 1: texture = 'asteroide.1'; break;
    case 2: texture = 'asteroide.2'; break;
    case 3: texture = 'asteroide.3'; break;
  }

  asteroide.setTexture(texture).setScale(0.12, 0.12)

  if (asteroide.texture.key == 'asteroide.1')
    asteroide.body.setCircle(
      asteroide.height * 0.45,
      asteroide.height * 0.05,
      asteroide.height * 0.05
    )
  if (asteroide.texture.key == 'asteroide.2')
    asteroide.body.setCircle(
      asteroide.height * 0.32,
      asteroide.height * 0.18,
      asteroide.height * 0.18
    )

  asteroide.setVelocity(
    vel * Math.sin(angulo),
    vel * Math.cos(angulo)
  )

  asteroide.body.pushable = false

}