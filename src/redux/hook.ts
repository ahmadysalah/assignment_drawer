import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from './store';
import { drawerConstants } from './constants';

export const useDrag = (): ObjectType => {
  const dispatch = useAppDispatch();
  const onDragEnd = useCallback(
    (payload: ObjectType) => {
      dispatch({
        type: drawerConstants.addShape,
        payload,
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

export const useWindowDimensions = (): {
  width: number;
  height: number;
  isMobile: boolean;
} => {
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
