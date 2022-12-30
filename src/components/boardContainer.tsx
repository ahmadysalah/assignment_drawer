import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/store';
import { drawerConstants } from '../redux/constants';
import { fillBoardFromJson, saveBoardToJson } from '../redux/actions';
import { useDrag, useWindowDimensions } from '../redux/hook';

const BoardContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { width, height } = useWindowDimensions();
  const { drawer, error, linesElements } = useAppSelector();
  const { onDragEnd } = useDrag();

  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClearBoard = useCallback(
    () =>
      dispatch({
        type: drawerConstants.clearBoard,
        payload: [],
      }),
    [],
  );

  const handleDropElement = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      const type = e.dataTransfer.getData('type');
      const color = e.dataTransfer.getData('color');
      const title = e.dataTransfer.getData('title');
      const x = e.clientX;
      const y = e.clientY;

      onDragEnd({
        type,
        color,
        title,
        x,
        y,
        screenX: width,
        screenY: height,
      });
    },

    [width, height],
  );
  const handleOpenFile = useCallback(() => {
    if (inputRef.current) inputRef.current.click();
  }, [inputRef]);

  return (
    <div
      className="container_board"
      onDragOver={e => e.preventDefault()}
      onDrop={handleDropElement}
    >
      <div>
        <button
          className="btn-primary"
          onClick={handleClearBoard}
          type="button"
        >
          clear
        </button>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="board">{children}</div>
      <div className="btn_rapper">
        <button
          className="btn btn-primary"
          onClick={() => dispatch(saveBoardToJson(drawer, linesElements))}
          type="button"
        >
          save
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleOpenFile}
          id="button"
        >
          load
        </button>
        <input
          id="file-input"
          ref={inputRef}
          type="file"
          accept=".json"
          name="name"
          style={{ display: 'none' }}
          onChange={e => dispatch(fillBoardFromJson(e))}
        />
      </div>
    </div>
  );
};

export default BoardContainer;
