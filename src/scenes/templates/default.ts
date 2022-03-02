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
    const { width, height } = this.scale;
    return { x: width / 2, y: height / 2 };
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

  update(time: number, delta: number): void {
    this.children.each(o => o.update(time, delta));
  }
  
  audio!: AudioManager;
  pausa!: Pausa;
  nivel!: NivelManager;

}