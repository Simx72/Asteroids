export interface ItemConf {
  name: string;
  icon: string;
}

export default class Item implements ItemConf {
  constructor(conf: ItemConf) {
    for (let key in conf) {
      let prop = key as keyof ItemConf
      this[prop] = conf[prop]
    }
    
  }

  name = "";
  icon = "";

}

export class ItemGroup extends Array<Item> {
  
  add<I extends ItemConf | Item>(itemOptions: I, pos = this.length): this {
    const item = (itemOptions instanceof Item) ? itemOptions : new Item(itemOptions);
    const eliminado = this.splice(pos, this.length - pos);
    this.push(item, ...eliminado)
    return this;
  }

  getByPos(pos: number): Item | undefined {
    return this[pos];
  }

  getByName(name: string): Item | undefined {
    return this.find(item => item.name = name);
  }

  removeWithPos(pos: number): this {
    this.splice(pos, 1);
    return this;
  }

  removeWithName(name: string): this {
    this.removeWithPos(
      this.findIndex(elt => elt.name = name)
    )
    return this;
  }
}