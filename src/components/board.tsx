import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/store';
import { Drawer } from './elements';
import { useWindowDimensions } from '../redux/hook';
import { drawerConstants } from '../redux/constants';
import BoardContainer from './boardContainer';
import LineShape from './elements/line';

const Board: React.FC = () => {
  const { width, height, isMobile } = useWindowDimensions();
  const { drawer } = useAppSelector();

  const dispatch = useDispatch();

  return (
    <BoardContainer>
      <div className="board">
        {drawer?.map((item: T, index: number) => {
          return (
            <Drawer
              key={index.toString().concat('_el')}
              {...item}
              screenW={width}
              screenH={height}
              isMobile={isMobile}
              onClick={() => {
                dispatch({
                  type: drawerConstants.dropShape,
                  payload: index,
                });
              }}
            />
          );
        })}
      </div>
      <LineShape />
    </BoardContainer>
  );
};

export default Board;
