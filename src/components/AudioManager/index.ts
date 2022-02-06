import musica from '../../musica';
import Scene from '../../scenes/templates/asteroids-scene';
import cookies from '../../cookies';
export default class AudioManager extends Phaser.GameObjects.GameObject {
  constructor(scene: Scene) {
    super(scene, "manager")


    let inputEfectos = document.querySelector<HTMLInputElement>('#volumen-efectos')
    if (inputEfectos != null) {

      inputEfectos.value = cookies.get('config-volumen-fx')

      inputEfectos.addEventListener('change', e => {
        if (inputEfectos != null) {
          cookies.set('config-volumen-fx', inputEfectos.value)
        }
      })
    }

    let inputMusica = document.querySelector<HTMLInputElement>('#volumen-musica')
    if (inputMusica != null) {

      inputMusica.value = cookies.get('config-volumen-musica')

      inputMusica.addEventListener('change', e => {
        if (inputMusica != null) {
          cookies.set('config-volumen-musica', inputMusica.value)
          musica.volume = parseInt(inputMusica.value) / 100
        }
      })
    }

  }

  currentSong = ""
  musica = musica

  setSong(url: string) {
    if (this.currentSong != url) {
      musica.src = url
      this.currentSong = url
    }
  }


}