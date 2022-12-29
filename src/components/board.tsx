import { useAppSelector } from '../redux/store';
import { Drawer } from './elements';

const Board: React.FC = () => {
  const board = useAppSelector();
  // console.log(board);
  return (
    <div className="main_board">
      {board.drawer.map((item: T, index: number) => {
        return <Drawer key={index.toString().concat('_el')} {...item} />;
      })}
    </div>
  );
};

export default Board;
