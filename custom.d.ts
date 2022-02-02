interface XY {
  x: number;
  y: number;
}

type Concrete<T> = {
  [Property in keyof T]-?: T[Property];
}