import { useMemo } from 'react';
import { useWindowDimensions } from '../../redux/hook';

const Drawer: React.FC<IShapeDrawer> = ({ type, title, x, y, color }) => {
  const { width, height, isChange } = useWindowDimensions();

  const position = useMemo(
    () => ({
      top: y,
      right: x,
    }),
    [width, height, x, y],
  );

  return (
    <div
      className={`shape ${type}`}
      style={{
        backgroundColor: color,
        position: 'absolute',
        ...position,
      }}
    >
      <p className="draw_title">{title}</p>
    </div>
  );
};

export default Drawer;
