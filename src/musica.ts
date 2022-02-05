import cookies from './cookies';

let musica = document.createElement('audio')
document.body.appendChild(musica)
musica.volume = Math.floor(cookies.getNum('config-volumen-musica', true)) / 100
musica.loop = true

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

export { musica };