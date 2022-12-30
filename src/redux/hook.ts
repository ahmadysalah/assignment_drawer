import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from './store';
import { drawerConstants } from './constants';

export const useDrag = (): ObjectType => {
  const dispatch = useAppDispatch();
  const onDragEnd = useCallback(
    ({
      x,
      y,
      title,
      color,
      type,
    }: {
      x: number;
      y: number;
      type: string;
      title: string;
      color: string;
    }) => {
      dispatch({
        type: drawerConstants.addShape,
        payload: { type, x, y, title, color },
      });
    },
    [dispatch],
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
