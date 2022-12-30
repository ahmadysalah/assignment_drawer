import { useCallback, useLayoutEffect, useState } from 'react';
import rough from 'roughjs/bundled/rough.esm';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useWindowDimensions } from '../../redux/hook';
import { drawerConstants } from '../../redux/constants';

const generator = rough.generator();

const createElement = (x1: number, y1: number, x2: number, y2: number) => {
  const roughElement = generator.line(x1, y1, x2, y2);
  return { x1, y1, x2, y2, roughElement };
};

const LineShape: React.FC = () => {
  const dispatch = useAppDispatch();
  const { linesElements } = useAppSelector();
  const { width, height, isMobile } = useWindowDimensions();
  const [drawing, setDrawing] = useState(false);

  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);
    linesElements?.forEach((item: T) => {
      const { roughElement } = item;
      roughCanvas.draw(roughElement);
    });
  }, [drawing, linesElements, width, height]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setDrawing(true);
      const { clientX, clientY } = e;
      const newElement = createElement(
        clientX,
        clientY - (isMobile ? 250 : 100),
        clientX,
        clientY - (isMobile ? 0 : 100),
      );
      dispatch({
        type: drawerConstants.addLine,
        payload: newElement,
      });
    },
    [linesElements, drawing, isMobile],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!drawing) return;
      const { clientX, clientY } = e;
      const index = linesElements.length - 1;
      const { x1, y1 } = linesElements[index];
      const updatedElement = createElement(x1, y1, clientX, clientY - 100);
      const newElement = [...linesElements];
      newElement[index] = updatedElement;
      dispatch({
        type: drawerConstants.fillLines,
        payload: newElement,
      });
    },
    [linesElements, drawing],
  );

  const handleMouseUp = useCallback(() => {
    setDrawing(false);
  }, []);

  return (
    <div className="canvas_line">
      <canvas
        id="canvas"
        width={isMobile ? width : width - 235}
        height={height * 0.7}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        Canvas
      </canvas>
    </div>
  );
};

export default LineShape;
