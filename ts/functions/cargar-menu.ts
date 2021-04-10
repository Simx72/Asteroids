import AsteroidsScene from "../scenes/templates/asteroids-scene";
import { mostrarTexto } from './animateCSS';
export function actualizarNivel(this: AsteroidsScene) {
  let puntos = this.dato('puntos')
  if (puntos < 100) {
    if (this.dato('nivel') != 1) {
      this.dato('nivel', 1)
      mostrarTexto('Nivel 1')
    }
    document.body.className = "level-1"
  } else if (puntos < 400) {
    this.dato('nivel', 2)
    document.body.className = "level-2"
  } else if (puntos < 1000) {
    this.dato('nivel', 3)
    document.body.className = "level-3"
  } else if (puntos < 2000) {
    this.dato('nivel', 4)
    document.body.className = "level-4"
  }
}