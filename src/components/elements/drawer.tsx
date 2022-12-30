import { useMemo } from 'react';
import { SHAPE_SIZE } from '../../utils/constants';

export interface IShapeDrawerComponent extends IShapeDrawer {
  screenW: number;
  screenH: number;
  isMobile: boolean;
  onClick: () => void;
}

const Drawer: React.FC<IShapeDrawerComponent> = ({
  type,
  title,
  x,
  y,
  color,
  screenX,
  screenY,
  screenW,
  screenH,
  isMobile,
  onClick,
}) => {
  const isChangePosition = useMemo(
    () => screenX !== screenW || screenY !== screenH,
    [screenX, screenY, screenW, screenH],
  );

  const { newX, newY } = useMemo(() => {
    if (isChangePosition) {
      return {
        newX: x + (screenW < screenX ? screenW - screenX : screenX - screenW),
        newY: y + (screenH < screenY ? screenH - screenY : screenY - screenH),
      };
    }
    return {
      newX: x,
      newY: y,
    };
  }, [isChangePosition, x, y, screenW, screenH, screenX, screenY]);

  return (
    <div
      className={`shape ${type} drawer`}
      style={{
        backgroundColor: color,
        position: 'absolute',
        top: !isChangePosition
          ? newY - SHAPE_SIZE.height
          : isMobile
          ? Math.max(newY - SHAPE_SIZE.height / 2, screenH * 0.3)
          : Math.abs(newY - SHAPE_SIZE.height / 2),
        left: !isChangePosition
          ? newX - SHAPE_SIZE.width
          : isMobile
          ? Math.max(newX - SHAPE_SIZE.width / 2, screenW * 0.3)
          : Math.abs(newX - SHAPE_SIZE.width / 2),
      }}
      onClick={onClick}
      aria-hidden
    >
      <p className="draw_title">{title}</p>
    </div>
  );
};

export default Drawer;
