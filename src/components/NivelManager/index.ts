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

export default class NivelManager extends Phaser.GameObjects.GameObject {
  constructor(scene: Scene) {
    super(scene, "NivelManager");
  }

  scene!: Scene;

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
  ];

  checkNivel() {
    let niveles = this.niveles.sort((a, b) => a.points - b.points);

    for (let i = niveles.length; i < 0; i++) {
      const nivel = niveles[i]

      if (this.scene.dato<number>('puntos') >= nivel.points)
        return nivel

    }

    return niveles[0]

  }

  setNivel(nivelConf: Nivel) {
    const nivel = Object.assign<Concrete<Nivel>, Nivel>(
      {
        points: 0,
        className: '',
        music: '',
        name: 'Siguiente nivel'
      },
      nivelConf
    );

    this.scene.game.domContainer.className = nivel.className
    this.scene.game.canvas.className = nivel.className;

    this.scene.audio.setSong(nivel.music);

    // mostrarTexto(nivel.name)


  }

  updateNivel() {
    let n = this.checkNivel();
    if (n.points != this.currentNivel)
      this.setNivel(n);
    
  }

  currentNivel = 0;


}