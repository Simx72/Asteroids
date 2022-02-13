import Scene from "../../scenes/templates/default";
import Bar from "./Bar";

class UI extends Phaser.GameObjects.GameObject {
  /**
   *
   */
  constructor(scene: Scene) {
    super(scene, "UI");
  }

  scene!: Scene;

  bar: { [P in keyof UI.Border as (P extends number? number : never)]: Bar } = {
    [UI.Border.TOPLEFT]: new Bar(this.scene, UI.Border.TOPLEFT),
    [UI.Border.TOPRIGHT]: new Bar(this.scene, UI.Border.TOPRIGHT),
    [UI.Border.BOTTOMLEFT]: new Bar(this.scene, UI.Border.BOTTOMLEFT),
    [UI.Border.TOPRIGHT]: new Bar(this.scene, UI.Border.TOPRIGHT)
  }



}

namespace UI {
  export enum Border {
    TOPLEFT,
    TOPRIGHT,
    BOTTOMLEFT,
    BOTTOMRIGHT,
  }
}

export default UI;