import AsteroidsMainScene from '../scenes/game-scene';
import Nave from '../components/Nave/index';
import { running } from '../components/Pausa/index';

export default function createNave(this: AsteroidsMainScene) {
  const nave = new Nave(this)
  this.nave = nave;

  
  this.data.set('intervalo puntos', window.setInterval(() => {
    if (running)
      this.data.values.puntos++;
    this.nivel.updateNivel()
  }, 3000))


  nave.body.setMaxSpeed(250)
  nave.body.setDrag(1, 1)

  nave.body.setCircle(
    nave.width * 0.34,
    nave.width * 0.16,
    nave.width * 0.16
  )

  this.input.keyboard.on('keydown-SPACE', () => {
    if (this.dato('vivo') == true) {
      nave.disparo()
    }
  });


  let exp = this.add.sprite(nave.x, nave.y, 'explosion')
    .setName('explosion')

  exp.anims.create({
    key: 'explotar',
    frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }),
    frameRate: 60,
    repeat: 0
  })

  exp.setVisible(false)

}