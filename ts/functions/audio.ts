import { cookies } from "./cookie-manager";

let musica = document.createElement('audio')
document.body.appendChild(musica)
musica.id = 'elemento-musica'
musica.volume = cookies.getNum('config-volume-musica', true)

document.getElementById('volumen-efectos')
  ?.addEventListener('change', e => {
    let element = e.target as HTMLInputElement;
    cookies.set('config-volumen-fx', element.value.toString())
  })

musica.addEventListener('change', e => {
  let element = e.target as HTMLInputElement;
  cookies.set('config-volumen-musica', element.value.toString())
  musica.volume = parseInt(element.value) / 100
})

export default musica;