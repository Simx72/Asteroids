import { Pausa } from "../../components/Pausa";


export default class AsteroidsScene extends Phaser.Scene {
  constructor(sceneName: string) {
    super({ key: sceneName });
  }

  dato = <T>(key: string | string[]): T =>
    this.data.get(key) as T;
  
  getElement = <T extends Phaser.GameObjects.GameObject | Phaser.GameObjects.Group>(key: string): T =>
    this.children.getByName(key) as T;

  get center(): XY {
    const { width: x, height: y } = this.scale;
    return { x, y };
  }

  /**
   * @method preload is called once the scene has been loaded
   */
  preload(): void {
    Pausa.preload(this);
  };
  
  /**
   * @method create is called on every scene start
   */
  create(): void {

    this.pausa = new Pausa(this);

    this.add.existing(this.pausa);
  };
  
  pausa!: Pausa;

}