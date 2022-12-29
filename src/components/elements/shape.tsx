import { useCallback, useRef, useState } from 'react';
import { useDrag, useWindowDimensions } from '../../redux/hook';

const colors = ['red', 'green', 'yellow', 'purple', 'orange', 'black'];

const Shape: React.FC<IShape> = ({ type }) => {
  const { onDragEnd } = useDrag(type);
  const { width } = useWindowDimensions();
  const shapeRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>();
  const [color, setColor] = useState<string>();
  const [isFocus, setIsFocused] = useState<boolean>(false);

  const handleClickRectangle = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleDragEnd = useCallback(
    (element: React.DragEvent<HTMLDivElement>) => {
      const isInBoard = width - width * 0.3 >= element.clientX;
      if (!isInBoard) return;
      setIsFocused(false);
      setTitle('');
      setColor('');
      onDragEnd({
        element,
        type,
        title,
        color,
      });
      shapeRef.current?.blur();
    },
    [onDragEnd, type, title, color, shapeRef, width],
  );
  return (
    <div
      ref={shapeRef}
      className={`shape ${type}`}
      onClick={handleClickRectangle}
      onBlur={() => setIsFocused(false)}
      style={{
        backgroundColor: color,
      }}
      draggable={!!title}
      aria-hidden
      onDragEnd={handleDragEnd}
    >
      {!isFocus ? (
        <p className="draw_title">{title}</p>
      ) : (
        <div className="draw_title_raper">
          <textarea
            placeholder="Type shape title"
            onChange={e => setTitle(e.target.value)}
            value={title}
            hidden={!isFocus}
            className="draw_input"
            rows={5}
          />
          <div className="draw_color_wrapper">
            {colors.map((backgroundColor, index) => (
              <button
                key={index.toString().concat(backgroundColor)}
                type="button"
                className="draw_color"
                style={{
                  backgroundColor,
                }}
                onClick={() => setColor(backgroundColor)}
              >
                <span className="draw_check" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Shape.defaultProps = {
  type: 'rectangle',
};

export default Shape;
