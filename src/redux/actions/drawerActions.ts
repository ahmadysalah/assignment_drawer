import { Dispatch } from 'react';
import drawerConstants from '../constants/drawerConstants';

// Fill the drawer with the json file
export const fillBoardFromJson =
  () =>
  async (dispatch: Dispatch<T>): Promise<T> => {
    try {
      dispatch({ type: drawerConstants.fillBoard, payload: [] });
    } catch (error) {
      console.log(error);
    }
  };
