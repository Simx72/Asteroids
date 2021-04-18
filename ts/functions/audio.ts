import { cookies } from './cookie-manager';

let musica = document.createElement('audio')
document.body.appendChild(musica)
musica.id = 'elemento-musica'
musica.src = 'https://pagina-simx72-aba9b.web.app/asteroids-assets/sounds/Crystal-Cave-Song-18.mp3'
musica.volume = cookies.getNum('config-volumen-musica', true) / 100
musica.loop = true
musica.play()

document.addEventListener('DOMContentLoaded', () => {

  let inputEfectos = document.querySelector<HTMLInputElement>('#volumen-efectos')
  if (inputEfectos != null) {

    inputEfectos.value = cookies.get('config-volumen-fx')

    inputEfectos.addEventListener('change', e => {
      e.preventDefault()
      if (inputEfectos != null) {
        cookies.set('config-volumen-fx', inputEfectos.value)
      }
    })
  }

  let inputMusica = document.querySelector<HTMLInputElement>('#volumen-musica')
  if (inputMusica != null) {

    inputMusica.value = cookies.get('config-volumen-musica')

    inputMusica.addEventListener('change', e => {
      e.preventDefault()
      if (inputMusica != null) {
        cookies.set('config-volumen-musica', inputMusica.value.toString())
        musica.volume = parseInt(inputMusica.value) / 100
      }
    })
  }

}, false)

export default musica;