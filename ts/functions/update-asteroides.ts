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

    switch (Phaser.Math.Between(1, 3)) {
      case 1: texture = 'asteroide.1'; break;
      case 2: texture = 'asteroide.2'; break;
      case 3: texture = 'asteroide.3'; break;
    }

    asteroide.setTexture(texture)

    this.scene.pause()

  }
}