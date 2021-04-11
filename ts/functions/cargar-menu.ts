import AsteroidsScene from "../scenes/templates/asteroids-scene";
import { mostrarTexto } from './animateCSS';
export function actualizarNivel(this: AsteroidsScene) {
  let puntos = this.dato('puntos')
  let canvas = document.querySelector('canvas')
  if (canvas != null) {
    if (puntos < 100) {
      if (this.dato('nivel') != 1) {
        mostrarTexto(`Nivel ${this.dato('nivel', 1)}`)
      }
      document.body.className = "level-1"
      document.querySelector('canvas')?.classList.add('level-1')
    } else if (puntos < 400) {
      if (this.dato('nivel') != 2) {
        mostrarTexto(`Nivel ${this.dato('nivel', 2)}`)
      }
      document.body.className = "level-2"
      document.querySelector('canvas')?.classList.add('level-2')
    } else if (puntos < 1000) {
      if (this.dato('nivel') != 3) {
        mostrarTexto(`Nivel ${this.dato('nivel', 3)}`)
      }
      document.body.className = "level-3"
      document.querySelector('canvas')?.classList.add('level-3')
    } else {
      if (this.dato('nivel') != 4) {
        mostrarTexto(`Nivel ${this.dato('nivel', 4)}`)
      }
      document.body.className = "level-4"
      document.querySelector('canvas')?.classList.add('level-4')
    }
  }
}