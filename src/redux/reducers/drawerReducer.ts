import { drawerConstants } from '../constants';

const initialState: IDrawerState = {
  drawer: [],
  linesElements: [],
  error: '',
  loading: false,
};

const DrawerReducers = (
  state: IDrawerState = initialState,
  action: IReducer,
): IDrawerState => {
  switch (action.type) {
    case drawerConstants.fillBoard:
      return {
        ...action.payload,
      };

    case drawerConstants.addShape: {
      return {
        ...state,
        drawer: [...state.drawer, action.payload],
      };
    }

    case drawerConstants.clearBoard: {
      return {
        ...state,
        drawer: [],
        linesElements: [],
        error: '',
        loading: false,
      };
    }

    case drawerConstants.loading: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case drawerConstants.dropShape: {
      const newDrawer = [...state.drawer];
      newDrawer.splice(action.payload, 1);
      return {
        ...state,
        drawer: newDrawer,
      };
    }

    case drawerConstants.addLine: {
      return {
        ...state,
        linesElements: [...state.linesElements, action.payload],
      };
    }

    case drawerConstants.fillLines: {
      return {
        ...state,
        linesElements: action.payload,
      };
    }

    case drawerConstants.error: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default DrawerReducers;
