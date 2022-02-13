import Scene from "../../scenes/templates/default";
import asset_song1 from '../../assets/sounds/Crystal-Cave-Song-18.mp3';
import asset_song2 from '../../assets/sounds/Of Far Different Nature - LOOP BOX #4 (CC-BY 4.0)/Of Far Different Nature - Oldskool [v2] (CC-BY 4.0).ogg';
import asset_song3 from '../../assets/sounds/Of Far Different Nature - LOOP BOX #4 (CC-BY 4.0)/Of Far Different Nature - Bouncer [v2] (CC-BY 4.0).ogg';
import asset_song4 from '../../assets/sounds/Of Far Different Nature - LOOP BOX #4 (CC-BY 4.0)/Of Far Different Nature - Pulse (CC-BY 4.0).ogg';

export interface Nivel {
  points: number;
  name?: string;
  music?: string;
  className?: string;
}

export default class NivelManager {
  constructor(scene: Scene) {
    this.scene = scene
  }

  scene: Scene;

  protected niveles: Nivel[] = [
    {
      points: 0,
      music: asset_song1
    }, {
      points: 100,
      music: asset_song2
    }, {
      points: 400,
      music: asset_song3
    }, {
      points: 1000,
      music: asset_song4
    }
  ].sort((a, b) => a.points - b.points);

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
    const newNivel = Object.assign<Concrete<Nivel>, Nivel>(
      {
        points: 0,
        className: '',
        music: '',
        name: 'Siguiente nivel'
      },
      (typeof nivel == 'number') ? this.niveles[nivel] : nivel
    );

    this.scene.game.domContainer.className = newNivel.className
    this.scene.game.canvas.className = newNivel.className;

    this.scene.audio.setSong(newNivel.music);

    // mostrarTexto(nivel.name)

    this.currentNivel = (typeof nivel == 'number') ? nivel : -1;


  }

  updateNivel() {
    let n = this.checkNivel();
    if (n != this.currentNivel)
      this.setNivel(n);
    
  }

  /**
   * Indica el indice del nivel actual
   * en la propiedad niveles, si el 
   * nivel no esta en esta propiedad
   * entonces valdra -1
   */
  currentNivel = 0;


}