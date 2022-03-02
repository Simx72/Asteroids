declare module Asset {
  const url: string
  export default url
}

declare module "*.wav" { export default Asset.default }
declare module "*.mp3" { export default Asset.default }
declare module "*.ogg" { export default Asset.default }
declare module "*.png" { export default Asset.default }
declare module "*.svg" { export default Asset.default }

declare module "*.array.json" { export default content as any[] }
declare module "*.json" { export default content as any }
declare module "*.html" { export default content as string }

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

type Optional<T> = {
  [Property in keyof T]?: T[Property];
}

type ExcludePropsWithValueType<Type, ValueType> = {
  [Property in keyof Type as (Type[Property] extends ValueType ? never : Property)]: Type[Property]
}

type NoMethods<Type> = ExcludePropsWithValueType<Type, Function>

interface CSSStyles extends Optional<NoMethods<CSSStyleDeclaration>> {}