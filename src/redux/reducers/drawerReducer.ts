import { drawerConstants } from '../constants';

const initialState: IDrawerState = {
  drawer: [],
};

const DrawerReducers = (
  state: IDrawerState = initialState,
  action: IReducer,
): IDrawerState => {
  switch (action.type) {
    case drawerConstants.fillBoard:
      return {
        ...state,
        drawer: action.payload,
      };

    case drawerConstants.addShape:
      return {
        ...state,
        drawer: [...state.drawer, action.payload],
      };

    default:
      return state;
  }
};

export default DrawerReducers;
