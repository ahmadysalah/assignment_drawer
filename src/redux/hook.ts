import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from './store';
import { drawerConstants } from './constants';

export const useDrag = (type: string): ObjectType => {
  const dispatch = useAppDispatch();
  const onDragEnd = useCallback(
    ({
      element,
      title,
      color,
    }: {
      element: React.DragEvent;
      type: string;
      title: string;
      color: string;
    }) => {
      dispatch({
        type: drawerConstants.addShape,
        payload: { type, x: element.clientX, y: element.clientY, title, color },
      });
    },
    [dispatch, type],
  );
  return { onDragEnd };
};

export const getWindowDimensions = (): ObjectType => {
  const { innerWidth: width, innerHeight: height } = global.window || {};
  return {
    width,
    height,
  };
};

export const useWindowDimensions = (): ObjectType => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  const isMobile = useMemo(
    () => windowDimensions.width < 668,
    [windowDimensions.width],
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width: windowDimensions.width,
    height: windowDimensions.height,
    isMobile,
  };
};
