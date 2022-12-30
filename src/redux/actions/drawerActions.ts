import { Dispatch } from 'react';
import drawerConstants from '../constants/drawerConstants';

// Fill the drawer with the json file
export const fillBoardFromJson =
  (e: React.ChangeEvent<HTMLInputElement>) =>
  async (dispatch: Dispatch<T>): Promise<T> => {
    // Get the json file
    if (!e.target.files) return setErrorMessage(dispatch, 'No file selected');
    const file = e.target.files[0];
    if (!file) setErrorMessage(dispatch, 'No file selected');
    if (file.type !== 'application/json')
      setErrorMessage(dispatch, 'Wrong file type');
    if (file.size > 100000)
      setErrorMessage(dispatch, 'File too big, max 100kb');
    // setting up the reader
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // Read json file
    reader.onload = () => {
      // Do whatever you want with the file contents
      const base64 = reader.result;
      if (typeof base64 !== 'string')
        return setErrorMessage(dispatch, 'Wrong file type');
      const json = atob(base64.split(',')[1]);
      if (typeof json === 'string') {
        const { board, linesElements } = JSON.parse(json);
        if (
          !Array.isArray(board) ||
          board.some(
            (shape: IShapeDrawer) => !shape.type || !shape.x || !shape.y,
          )
        )
          return setErrorMessage(dispatch, 'Wrong file type');
        dispatch({
          type: drawerConstants.fillBoard,
          payload: { drawer: board, linesElements },
        });
        return setErrorMessage(dispatch, '');
      }
    };
  };

export const saveBoardToJson =
  (board: IShapeDrawer[], linesElements: IShapeLine[]) =>
  async (dispatch: Dispatch<T>): Promise<T> => {
    try {
      // Save the board to a json file
      if (!board.length) return setErrorMessage(dispatch, 'No shapes to save');
      const element = document.createElement('a');
      const jsonFile = new Blob([JSON.stringify({ board, linesElements })], {
        type: 'text/plain',
      });
      element.href = URL.createObjectURL(jsonFile);
      element.download = 'board.json';
      document.body.appendChild(element);
      element.click();
    } catch (error) {
      dispatch({ type: drawerConstants.error, payload: error });
    }
  };

const setErrorMessage = (dispatch: Dispatch<T>, error: string) => {
  dispatch({ type: drawerConstants.error, payload: error });
  return 'error';
};
