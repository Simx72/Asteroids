import Scene from "../../../scenes/templates/default";
import { ItemGroup as Items } from '../Item';
import UI from '..';
import barTmpl from "./bar-template.html"
import itemTmpl from "./item-template.html"
// import styles from "./Bar.module.css";

class Bar extends Phaser.GameObjects.DOMElement {
  constructor(
    scene: Scene,
    side: UI.Border,
    margin: Optional<XY> = {}) {
    super(scene)

    this.side = side;

    let { x: marginX, y: marginY } = Object.assign({ x: 10, y: 10 }, margin)

    this.marginX = marginX;
    this.marginY = marginY;

    this.align()

  }

  protected side: UI.Border;
  protected marginX: number;
  protected marginY: number;

  align() {

    if (this.side in UI.Border) {
      const borderName = UI.Border[this.side];
      const regex = /^(TOP|BOTTOM)(LEFT|RIGHT)$/;

      const res = regex.exec(borderName)?.splice(1, 2)

      if (res) {
        const [ver, hor] = res as ['TOP' | 'BOTTOM', 'LEFT' | 'RIGHT'];
        switch (ver) {
          case 'TOP':
            this.originY = 0;
            this.setY(this.marginY)
            break;
          case 'BOTTOM':
            this.originY = 1;
            this.setY(this.scene.scale.height - this.marginY)
        }
        switch (hor) {
          case 'LEFT':
            this.originX = 0;
            this.setX(this.marginX)
            break;
          case 'RIGHT':
            this.originY = 1;
            this.setX(this.scene.scale.width - this.marginX)
        }
      }


    }

  }

  readonly items = new Items();

  private fromTemplate<T extends Object>(template: string, vars: T) {
    let instance = template.toString()
    for (const key in vars) {
      instance.replace(
        `%${key.toUpperCase()}%`,
        vars[key] as any
      )
    }
    return instance;
  }

  /**
   * this function generates the item html
   */
  render() {
    super.setHTML(
      this.fromTemplate(
        barTmpl,
        {
          item: this.items.map(item => this.fromTemplate(
            itemTmpl,
            Object.assign(
              // { itemclassname: styles["Item"] },
              item
            )
          )).join(),
          // barclassname: styles["Bar"]
        }
      )
    )
  }

  /**
   * this method should not be used
   * @deprecated
   */
  setHTML(html: string): this {
    return super.setHTML(html)
  }

}

export default Bar;