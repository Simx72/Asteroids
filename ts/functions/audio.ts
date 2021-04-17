import { cookies } from "./cookie-manager";

let musica = document.createElement('audio')
document.body.appendChild(musica)
musica.id = 'elemento-musica'
musica.src = 'https://pagina-simx72-aba9b.web.app/asteroids-assets/sounds/Crystal-Cave-Song-18.mp3'
musica.volume = cookies.getNum('config-volumen-musica', true) / 100
musica.play()

let inputEfectos = document.querySelector<HTMLInputElement>('#volumen-efectos')

if (inputEfectos != null) {
  inputEfectos.addEventListener('change', e => {
    if (inputEfectos != null) {
      cookies.set('config-volumen-fx', inputEfectos.value.toString())
    }
  })
}

let inputMusica = document.getElementById('volumen-musica')

inputMusica.addEventListener('change', e => {
  let element = e.target as HTMLInputElement;
  cookies.set('config-volumen-musica', element.value.toString())
  musica.volume = parseInt(element.value) / 100
})

export default musica;