import { cookies } from "./cookie-manager";

let musica = document.createElement('audio')
document.body.appendChild(musica)
musica.id = 'elemento-musica'
musica.src = 'https://pagina-simx72-aba9b.web.app/asteroids-assets/sounds/Crystal-Cave-Song-18.mp3'
console.log(cookies.getNum('config-volumen-musica', true) / 100)
musica.volume = cookies.getNum('config-volume-musica', true) / 100
musica.play()



document.getElementById('volumen-efectos')
  ?.addEventListener('change', e => {
    let element = e.target as HTMLInputElement;
    cookies.set('config-volumen-fx', element.value.toString())
  })

document.getElementById('volumen-musica')
  ?.addEventListener('change', e => {
    let element = e.target as HTMLInputElement;
    cookies.set('config-volumen-musica', element.value.toString())
    musica.volume = parseInt(element.value) / 100
  })

export default musica;