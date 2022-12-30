import { useCallback, useRef, useState } from 'react';

const colors = ['red', 'green', 'yellow', 'purple', 'orange', 'black'];

const Shape: React.FC<IShape> = ({ type }) => {
  const shapeRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState<string>();
  const [color, setColor] = useState<string>();
  const [isFocus, setIsFocused] = useState<boolean>(false);

  const handleClickShape = useCallback(() => {
    setIsFocused(true);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    });
  }, [inputRef]);

  const onDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData('type', type);
      if (title) e.dataTransfer.setData('title', title);
      if (color) e.dataTransfer.setData('color', color);
    },
    [color, title, type],
  );

  const handleDragEnd = useCallback(() => {
    setIsFocused(false);
    setTitle('');
    setColor('');
  }, [type, title, color, shapeRef]);
  return (
    <div
      ref={shapeRef}
      className={`shape ${type}`}
      onClick={handleClickShape}
      id={type}
      onDoubleClick={() => setIsFocused(false)}
      style={{
        backgroundColor: color,
      }}
      draggable={!!title}
      aria-hidden
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
    >
      {!isFocus ? (
        <p className="draw_title">{title}</p>
      ) : (
        <div className="draw_title_raper">
          <textarea
            ref={inputRef}
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
                onClick={() => {
                  setColor(backgroundColor);
                  setIsFocused(false);
                }}
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
