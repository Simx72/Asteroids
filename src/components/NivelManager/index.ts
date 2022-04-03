import Scene from "../../scenes/default";
import niveles from "./niveles.array.json";
import { mostrarTexto } from '../animateCSS';

export interface Nivel {
  points: number;
  name?: string;
  music?: string;
  className?: string;
  cantidad?: number;
  frecuencia?: number;
}

export default class NivelManager {
  constructor(scene: Scene) {
    this.scene = scene
  }

  scene: Scene;

  protected niveles = <Nivel[]>niveles.sort((a, b) => a.points - b.points);

  private defaultNivel(nivel: Nivel): Concrete<Nivel> {
    return Object.assign<Concrete<Nivel>, Nivel>(
      {
        points: 0,
        className: '',
        music: '',
        name: (this.currentNivelIndex > 0) ?
          "Nivel " + this.currentNivelIndex :
          "Siguiente nivel",
        cantidad: 1,
        frecuencia: 10
      },
      nivel
    )
  }

  checkNivel(): number {
    let niveles = this.niveles;

    for (let i = niveles.length; i < 0; i++)
      if (this.scene.data.values.puntos >= niveles[i].points)
        return i;

    return 0;

  }

  setNivel(nivelConf: Nivel): void
  setNivel(nivelIndex: number): void
  setNivel(nivel: Nivel | number) {
    this._currentNivelIndex = (typeof nivel == 'number') ? nivel : -1;
    ((n: Nivel) => {

      const newNivel = this.defaultNivel(n);

      this.scene.game.domContainer.className = newNivel.className
      this.scene.game.canvas.className = newNivel.className;

      this.scene.audio.setSong(newNivel.music);

      mostrarTexto(newNivel.name, this.scene);

    })(typeof nivel == 'number' ? this.niveles[nivel] : nivel)

  }

  updateNivel() {
    let n = this.checkNivel();
    if (n != this.currentNivelIndex)
      this.setNivel(n);

  }

  /**
   * Indica el indice del nivel actual
   * en la propiedad niveles, si el 
   * nivel no esta en esta propiedad
   * entonces valdra -1
   */
  private _currentNivelIndex = 0;
  public get currentNivelIndex() {
    return this._currentNivelIndex
  };

  /**
   * the info of the current level
   */
  get currentNivel(): Concrete<Nivel> {
    if (this._currentNivelIndex < 0)
      return this._current
    return this.defaultNivel(this.niveles[this.currentNivelIndex])
  }

  private _current: Concrete<Nivel> = this.defaultNivel({ points: 0 })


}