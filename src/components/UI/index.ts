import Scene from "../../scenes/templates/default";
import Bar from "./Bar";

class UI {
  /**
   *
   */
  constructor(scene: Scene) {
    this.scene = scene;
    this.bar = [
      createBar(UI.Border.TOPLEFT),
      createBar(UI.Border.TOPRIGHT),
      createBar(UI.Border.BOTTOMLEFT),
      createBar(UI.Border.TOPRIGHT)
    ];

    Object.seal(this.bar);

    function createBar(side: UI.Border) {
      const bar = new Bar(scene, side);
      scene.add.existing(bar)
      return bar;
    }

    this.bar[UI.Border.BOTTOMRIGHT].items.add({
      icon: '',
      name: ''
    })

  }

  scene: Scene;
  bar: { readonly [P in UI.Border]: Bar };

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