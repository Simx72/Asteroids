import AsteroidsScene from "../scenes/templates/asteroids-scene";
export function actualizarNivel(this: AsteroidsScene) {
  let puntos = this.dato('puntos')
  if (puntos < 100) {
    this.dato('nivel', 1)
    document.body.className = "level-1"
  } else if (puntos < 200) {
    this.dato('nivel', 2)
    document.body.className = "level-2"
  } else if (puntos < 300) {
    this.dato('nivel', 3)
    document.body.className = "level-3"
  } else if (puntos < 400) {
    this.dato('nivel', 4)
    document.body.className = "level-4"
  }
}