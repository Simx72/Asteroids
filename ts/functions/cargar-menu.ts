import AsteroidsScene from "../scenes/templates/asteroids-scene";
import { mostrarTexto } from './animateCSS';
import { cookies } from "./cookie-manager";
export function actualizarNivel(this: AsteroidsScene) {
  let puntos = this.dato('puntos')
  let canvas = document.querySelector('canvas')
  if (canvas != null) {
    if (puntos < 100) {
      if (this.dato('nivel') != 1) {
        mostrarTexto(`Nivel ${this.dato('nivel', 1)}`)
      }
      document.body.className = "level-1"
      canvas.classList.remove('level-2', 'level-3', 'level-4')
      canvas.classList.add('level-1')
    } else if (puntos < 400) {
      if (this.dato('nivel') != 2) {
        mostrarTexto(`Nivel ${this.dato('nivel', 2)}`)
      }
      document.body.className = "level-2"
      canvas.classList.remove('level-1', 'level-3', 'level-4')
      canvas.classList.add('level-2')
    } else if (puntos < 1000) {
      if (this.dato('nivel') != 3) {
        mostrarTexto(`Nivel ${this.dato('nivel', 3)}`)
      }
      document.body.className = "level-3"
      canvas.classList.remove('level-1', 'level-2', 'level-4')
      canvas.classList.add('level-3')
    } else {
      if (this.dato('nivel') != 4) {
        mostrarTexto(`Nivel ${this.dato('nivel', 4)}`)
      }
      document.body.className = "level-4"
      canvas.classList.remove('level-1', 'level-2', 'level-3')
      canvas.classList.add('level-4')
    }
  }
}

export function crearMenu() {
  let menu = document.createElement("div")
  document.body.appendChild(menu)
  menu.id = "menu"
  menu.style.display = 'none'
  menu.style.position = 'absolute'
  menu.innerHTML = `
  <!-- html -->
  <h1>Volumen</h1>
  <label for="volumen-efectos">Efectos</label>
  <input type="range" max="100" min="0" value="100" step="1" name="volumen-efectos" id="volumen-efectos">
  <label for="volumen-musica">Música</label>
  <input type="range" max="100" min="0" value="100" step="1" name="volumen-musica" id="volumen-musica">
  <!-- !html -->
  `
}

export function cargarMenu(this: AsteroidsScene) {
  cookies.check('config-volumen-fx')
    .catch(() => cookies.set('config-volumen-fx', '100'))
  cookies.check('config-volumen-musica')
    .catch(() => cookies.set('config-volumen-musica', '100'))
  let menu = <HTMLInputElement>document.getElementById('menu')
  menu.style.width = (this.scale.width * 0.6) + 'px'
  menu.style.height = (this.scale.height * 0.8) + 'px'
  menu.style.top = (this.scale.height * 0.1) + 'px'
  menu.style.left = (this.scale.width * 0.2) + 'px'
  document.getElementById('volumen-efectos')
    ?.addEventListener('change', e => {
      let element = e.target as HTMLInputElement;
      cookies.set('config-volumen-fx', element.value.toString())
    })
  document.getElementById('volumen-musica')
    ?.addEventListener('change', e => {
      let element = e.target as HTMLInputElement;
      cookies.set('config-volumen-musica', element.value.toString())
      try {
        let musica = this.sound.getAll('audio.crystal-cave')[0]
        let volumen = cookies.getNum('config-volumen-musica', true) / 100
        musica.destroy()
        this.sound.add('audio.crystal-cave').play('', { volume: volumen })
      } catch (e) { console.error(e) }

    })
}

export function quitarMenu(this: AsteroidsScene) {

}