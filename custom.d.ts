declare module Asset {
  const content: any
  export default content
}

declare module "*.wav" { export default Asset.default }
declare module "*.png" { export default Asset.default }
declare module "*.svg" { export default Asset.default }
declare module "*.json" { export default Asset.default }
declare module "*.html" { export default Asset.default }

declare module "*.css" {
  const styles: { [c: string]: string };
  export default styles;
}
interface XY {
  x: number;
  y: number;
}

type Concrete<T> = {
  [Property in keyof T]-?: T[Property];
}