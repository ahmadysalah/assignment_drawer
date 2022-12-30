import { SHAPE_SIZE } from '../../utils/constants';

const Drawer: React.FC<IShapeDrawer> = ({ type, title, x, y, color }) => {
  return (
    <div
      className={`shape ${type}`}
      style={{
        backgroundColor: color,
        position: 'absolute',
        top: y - SHAPE_SIZE.height,
        left: x - SHAPE_SIZE.width,
      }}
    >
      <p className="draw_title">{title}</p>
    </div>
  );
};

export default Drawer;
