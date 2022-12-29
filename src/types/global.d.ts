type T = any;

interface IDrawerState {
  drawer: T;
}

interface IReducer {
  type: string;
  payload: T;
}

interface IShape {
  type: 'circle' | 'square' | 'rectangle';
}

interface ObjectType {
  [key: string]: T;
}

interface IShapeDrawer {
  type: string;
  title: string;
  color: string;
  x: number;
  y: number;
}
