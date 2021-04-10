import AsteroidsScene from "../scenes/templates/asteroids-scene";
export function actualizarFondo(this: AsteroidsScene) {
  let puntos = this.dato('puntos')
  if (puntos < 100) {
    document.body.className = "level-1"
  } else if (puntos < 200) {
    document.body.className = "level-2"
  } else if (puntos < 300) {
    document.body.className = "level-3"
  } else if (puntos < 400) {
    document.body.className = "level-4"
  }
}