import cookies from './cookies';

let musica = document.createElement('audio')
document.body.appendChild(musica)
musica.volume = Math.floor(cookies.getNum('config-volumen-musica', true)) / 100
musica.loop = true

export default musica;