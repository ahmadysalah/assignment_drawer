type T = any;

interface IDrawerState {
  drawer: IShapeDrawer[];
  linesElements: IShapeLine[];
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

interface IShapeLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  roughElement: ObjectType;
}
