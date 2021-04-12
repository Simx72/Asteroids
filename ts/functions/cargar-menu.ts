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

export function cargarMenu(this: AsteroidsScene) {
  cookies.set('config-volumen-fx', '100')
  cookies.set('config-volumen-music', '100')
  let menu = document.createElement("button")
  document.body.appendChild(menu)
  menu.id = "menu"
  menu.innerHTML = `
  <!-- html -->
    <label for="volumen-efectos">Efectos:</label>
    <input type="range" max="100" min="0" step="1" name="volumen-efectos" id="volumen-efectos">
  <!-- !html -->
  `
  menu.style.position = 'absolute'
  menu.style.width = (this.scale.width * 0.6) + 'px'
  menu.style.height = (this.scale.height * 0.8) + 'px'
  menu.style.top = (this.scale.height * 0.1) + 'px'
  menu.style.left = (this.scale.width * 0.2) + 'px'
}