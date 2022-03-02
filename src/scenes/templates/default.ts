import NivelManager from "../../components/NivelManager";
import Pausa from "../../components/Pausa";
import AudioManager from '../../components/AudioManager/index';


export default class DefaultAsteroidsScene extends Phaser.Scene {
  constructor(sceneName: string) {
    super({ key: sceneName });
  }

  dato = <T>(key: string | string[]): T =>
    this.data.get(key) as T;
  
  getElement = <T extends Phaser.GameObjects.GameObject | Phaser.GameObjects.Group>(key: string): T =>
    this.children.getByName(key) as T;

  get center(): XY {
    const { width: x, height: y } = this.scale;
    return { x: x/2, y: y/2 };
  }

  /**
   * @method preload is called once the scene has been loaded
   */
  preload(): void { };
  
  /**
   * @method create is called on every scene start
   */
  create(): void {

    this.audio = new AudioManager(this);
    this.pausa = new Pausa(this);
    this.nivel = new NivelManager(this);


  };
  
  audio!: AudioManager;
  pausa!: Pausa;
  nivel!: NivelManager;

}