type T = any;

interface IDrawerState {
  drawer: IShapeDrawer[];
  error: string;
  loading: boolean;
}

interface IReducer {
  type: string;
  payload: T;
}

interface IShape {
  type: 'circle' | 'square' | 'rectangle' | 'triangle';
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
  screenX: number;
  screenY: number;
}
