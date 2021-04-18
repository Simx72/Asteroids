import { cookies } from './cookie-manager';

cookies.check('config-volumen-musica')
  .catch(() => cookies.set('config-volumen-musica', '100'))
cookies.check('config-volumen-fx')
  .catch(() => cookies.set('config-volumen-fx', '100'))

let musica = document.createElement('audio')
document.body.appendChild(musica)
musica.id = 'elemento-musica'
musica.src = 'https://pagina-simx72-aba9b.web.app/asteroids-assets/sounds/Crystal-Cave-Song-18.mp3'
musica.volume = cookies.getNum('config-volumen-musica', true) / 100
musica.loop = true
musica.play()

window.onload = () => {

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

export default musica;