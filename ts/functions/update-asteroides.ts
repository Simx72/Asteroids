import AsteroidsMainScene from '../scenes/game-scene';
export function updateAsteroides(this: AsteroidsMainScene) {
  let asteroides = <Phaser.Physics.Arcade.Group>this.objeto('grupo.ast')

  asteroides.rotate(Phaser.Math.DegToRad(3))

  if (this.game.getFrame() % 3 == 0 && this.dato('cargado')) {
    let x = 0,
      y = 0,
      angulo = 0,
      vel = 0;

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

    asteroide.body.pushable = false


    this.scene.pause()

  }
}